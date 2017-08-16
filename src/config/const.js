/* eslint-disable import/no-mutable-exports */
import Vue from 'vue';
import axios from 'axios';
import alertify from 'alertifyjs'
import 'alertifyjs/build/css/alertify.min.css'
import './alertify.css'

// axios
Vue.prototype.$http = axios;

alertify.set('notifier','position', 'top-center');
alertify.set('notifier','delay', 100);

window.alertify = alertify;

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
  alertify
};
