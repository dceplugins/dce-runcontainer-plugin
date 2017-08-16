/* eslint-disable import/no-mutable-exports */
import Vue from 'vue';
import axios from 'axios';
import Noty from 'noty';
import 'noty/lib/noty.css';

Noty.overrideDefaults({
  layout: 'topCenter',
  theme: 'relax',
  type: 'success',
  progressBar: false,
  closeWith: ['click', 'button'],
  animation: {
    open: 'animated fadeInDown',
    close: 'animated fadeOutUp',
  },
  timeout: 5000,
});

window.Noty = Noty;

// axios
Vue.prototype.$http = axios;

// API_URL
const defaultUrl = 'http://192.168.100.30';
let currentUrl = defaultUrl;
if (process.env.API_URL) {
  currentUrl = process.env.API_URL;
  // API_URL 不能是 /, 否则最终 XHR 的请求 url 就变成了 http://api/networks 这样
  if (process.env.API_URL === '/') {
    currentUrl = '.';
  }
}
Vue.prototype.API_URL = currentUrl;
// Vue.prototype.storage = storage;

export {
  axios as $http,
  currentUrl as API_URL,
};
