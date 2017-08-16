// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'

// dao-style
/* eslint-disable import/no-extraneous-dependencies */
import daoStyle from 'dao-style-package-vue';
import VueCodeMirror from 'vue-codemirror';

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  template: '<App/>',
  components: { App },
})
