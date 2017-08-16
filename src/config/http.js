/* global Promise */
// TODO 可能需要一个不需要 X-DCE-TENANT api 的列表
import { $http, API_URL } from './const';
import storage from './localstorage';

// Global axios defaults
$http.defaults.baseURL = API_URL;

// interceptors
$http.interceptors.request.use(config => {
  // Do something before request is sent
  return config;
}, error => {
  // Do something with request error
  return Promise.reject(error);
});

// Add a response interceptor
$http.interceptors.response.use(response => {
  // Do something with response data
  return response;
}, error => {
  // Do something with response error
  // TODO: then 中的 parse error 会传递到 catch 里面
  const _error = _.get(error, 'response');

  if (!_error) return Promise.reject(error);

  return Promise.reject(_error);
});


// 设置 http headers X-DCE-Access-Token
function setToken(token) {
  if (token) {
    $http.defaults.headers['X-DCE-Access-Token'] = token;
  } else {
    delete $http.defaults.headers['X-DCE-Access-Token'];
  }
}
setToken(storage.token);

export {
  setTenant,
  setToken,
  openChangePwdDialog$$,
};
