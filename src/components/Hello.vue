<template>
  <div class="hello">
    <!-- <dao-select
      v-model="option"
      [placeholder="请选择"]
      [:loading="true"]
      [loading-text="加载中"]
      [:async="getOptions"]
      [:disabled="false"]
      [:with-btn="false"]
      [btn-content="按钮"]
      [:with-search="false"]
      [search-placeholder="搜索"]
      [menu-class="menuClass"]
      [no-data-text="无数据"]
      [no-match-text="无匹配数据"]
      [:append-to-body="appendToBody"]
      [:popper-cls="popperCls"]>
      <dao-option-group [label="name"]>
        <dao-option :value="mimo" :label="mimo"></dao-option>
      </dao-option-group>
    </dao-select> -->
  </div>
</template>

<script>
import nodeApi from '@/api/node';

export default {
  name: 'hello',
  created() {
    nodeApi.getIpMap()
      .then(res => {
        console.log('nodeList', res)
        this.nodeList = res;
      });
  },
  data () {
    return {
      nodeList: [],
    }
  }
}
</script>

<style scoped>

</style>
