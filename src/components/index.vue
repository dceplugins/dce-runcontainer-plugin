<template>
  <div>
    <dao-setting-layout>
      <div slot="layout-title">创建容器</div>
      <dao-setting-section>
        <div slot="label">容器名称</div>
        <div slot="content">
          <dao-input v-model="container.name" required placeholder="如：2048_1">
          </dao-input>
        </div>
      </dao-setting-section>
      <dao-setting-section>
        <div slot="label">选择主机</div>
        <div slot="content">
          <dao-select v-model="node" placeholder="请选择主机" with-search search-placeholder="搜索主机" no-data-text="没有主机" no-match-text="没有匹配的主机">
            <dao-option-group>
              <dao-option v-for="node in nodeList" :key="node.id" :value="node" :label="node.name"></dao-option>
            </dao-option-group>
          </dao-select>
          <div class="helper-text">容器将会运行在这台主机上</div>
        </div>
      </dao-setting-section>
      </dao-setting-section>
      <dao-setting-section>
        <div slot="label">镜像</div>
        <div slot="content">
          <dao-input v-model="container.image" required placeholder="如：daocloud.io/daocloud/dao-2048"></dao-input>
        </div>
      </dao-setting-section>
      <dao-setting-section>
        <div slot="label">Hostname</div>
        <div slot="content">
          <dao-input v-model="container.hostname" required placeholder="如：2048-instance-1"></dao-input>
          <div class="helper-text">容器的 Hostname</div>
        </div>
      </dao-setting-section>
      <dao-setting-section>
        <div slot="label">网络名称</div>
        <div slot="content">
          <dao-input v-model="container.network" required placeholder="如：0LAN"></dao-input>
          <div class="helper-text">要给容器绑定 MACVLAN 网络的名称</div>
        </div>
      </dao-setting-section>
      <dao-setting-section>
        <div slot="label">IP</div>
        <div slot="content">
          <dao-input v-model="container.ip" required placeholder="如：10.0.70.11"></dao-input>
          <div class="helper-text">分配给容器的 IP, 不填则会自动分配</div>
        </div>
      </dao-setting-section>
      <dao-setting-section>
        <div slot="label">CAP_ADD</div>
        <div slot="content">
          <dao-input v-model="container.cap_add" required placeholder="如：IPC_OWNER,SYS_ADMIN (逗号隔开)"></dao-input>
          <div class="helper-text">分配给容器的系统特权，多个用逗号隔开</div>
        </div>
      </dao-setting-section>
      <dao-setting-section>
        <div slot="label">容器配置</div>
        <div slot="content">
          <codemirror v-model="yaml" :options="codeMirrorOptions"></codemirror>
          <div class="helper-text">YAML 表示的容器高级配置，请参照 Docker API
            <a href="https://docs.docker.com/engine/api/v1.27/#operation/ContainerCreate" target="_blank">创建容器</a>
          </div>
        </div>
      </dao-setting-section>
      <dao-setting-section>
        <div slot="label">创建后启动</div>
        <div slot="content">
          <dao-switch :option="{ on: '是', off: '否' }"
                      :with-notice="true"
                      v-model="start"
                      :disabled="false">
          </dao-switch>
          <div class="helper-text">是否创建后立即启动容器</div>
        </div>
      </dao-setting-section>
      <div slot="footer">
        <div class="helper-text red" v-if="errorMsg">{{ errorMsg }}。请检查您的配置是否漏填或填写错误</div>
        <div class="dao-btn blue" @click="createContainer()">创建容器</div>
      </div>
    </dao-setting-layout>
  </div>
</template>

<script>
import nodeApi from '@/api/node';
import { genSpec, parseYaml, mergeSpecs } from './container-tools'
import containerApi from '@/api/container'
import { alertify } from '@/config/const'

export default {
  name: 'runContainer',
  created() {
    nodeApi.getIpMap()
      .then(res => {
        for (let id in res) {
          this.nodeList.push({
            name: res[id].hostname,
            id,
            ip: res[id]['advertised_ip'],
            address: res[id]['advertised_address'],
          });
        }
        if (this.nodeList.length) {
          this.node = this.nodeList[0];
        }
      });
  },
  data() {
    return {
      start: true,
      nodeList: [],
      node: {},
      errorMsg: '',
      container: {
        name: '',
        image: '',
        hostname: '',
        network: '0LAN',
        ip: '',
        cap_add: '',
      },
      yaml: `# 下面是容器的高级配置，格式等价于 Docker Engine API 的 Container Spec 的 YAML 形式，注意：这个不是 docker-compose
# 在这里描述的同名参数会覆盖上面表单填写的参数
# 容器参数
#Cmd: ""
#Entrypoint: ""
#CpuQuota: 90000 # CPU限制，0.9核
#Memory: 2147483648 # 内存限制，2GB
Env: # 容器环境变量
  - FOO=Bar

Labels: # 容器标签
  foo: bar

# 容器 HOST 参数
HostConfig:
  Privileged: false
  LogConfig:
    Type: "json-file"
    Config:
      max-file: "2"
      max-size: "100m"
#  Binds: # 主机目录挂载, 格式：[存储卷名|主机目录]:容器目录[:读写权限]
#  - /tmp:/tmp # 读写
#  - /mnt:/mnt:ro # 只读
#  RestartPolicy:
#    Name: "unless-stopped"
#    MaximumRetryCount: 10
`,
      // codeMirror 配置
      codeMirrorOptions: {
        lineNumbers: true,
        indentWithTabs: false, // 自动缩进时不使用 Tab 缩进而是使用空格
        lineWrapping: true,
        styleActiveLine: true,
        theme: '3024-night',
        mode: 'text/x-yaml',
        extraKeys: {
          // 手动缩进时使用空格替换 Tab
          // 空格的数量由 'indentUnit' 配置决定，默认为 2
          Tab: cm => {
            const spaces = Array(cm.getOption('indentUnit') + 1).join(' ');
            cm.replaceSelection(spaces, 'end');
          },
          'Ctrl-Enter': cm => {
            cm.setOption('fullScreen', !cm.getOption('fullScreen'));
          },
        },
      },
    }
  },
  methods: {
    createContainer() {
      let spec = genSpec(this.container);
      let yaml = parseYaml(this.yaml);
      spec = mergeSpecs(spec, yaml);
      // console.log(spec)
      containerApi.create(this.container.name, spec, `/api/nodes/${this.node.address}/docker`)
        .then(res => {
          if (this.start) {
            return containerApi.start(res.Id)
              .then(()=>res);
          }
          return res;
        })
        .then(res => {
          this.errorMsg = null;
          alertify.success('操作成功');
          window.top.location.href = `/#/container/detail/${res.Id}`;
        })
        .catch(err => {
          this.errorMsg = `操作失败：${err.status} ${err.statusText}: ${err.data}`;
          alertify.error(this.errorMsg);
        });
      // console.log('start', this.start)
    }
  }
}
</script>

<style>
.dao-select {
  margin-bottom: 20px;
}

.dao-btn {
  margin-top: 20px;
}

.red {
  color: red;
}
</style>
