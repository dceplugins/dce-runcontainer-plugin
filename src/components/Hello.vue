<template>
  <div class="hello">
    <dao-select
      v-model="node"
      placeholder="请选择主机"
      with-search
      search-placeholder="搜索主机"
      no-data-text="没有主机"
      no-match-text="没有匹配的主机">
      <dao-option-group>
        <dao-option v-for="node in nodeList"
          :value="node.id"
          :label="node.name"></dao-option>
      </dao-option-group>
    </dao-select>
    <codemirror v-model="yaml" :options="codeMirrorOptions"></codemirror>
    <div class="dao-btn blue">保存</div>
  </div>
</template>

<script>
import nodeApi from '@/api/node';

export default {
  name: 'hello',
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
          this.node = this.nodeList[0].id;
        }
      });
  },
  data () {
    return {
      nodeList: [],
      node: {},
      yaml: '',
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
  }
}
</script>

<style scoped>
  .dao-select {
    margin-bottom: 20px;
  }
  .dao-btn {
    margin-top: 20px;
  }
</style>
