// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'

import '@/config/http';

// dao-style
/* eslint-disable import/no-extraneous-dependencies */
import daoStyle from 'dao-style-package-vue';
import VueCodeMirror from 'vue-codemirror';

Vue.config.productionTip = false

Vue.use(daoStyle);
Vue.use(VueCodeMirror);

/* eslint-disable no-new */
new Vue({
  el: '#app',
  template: '<App/>',
  components: { App },
})
