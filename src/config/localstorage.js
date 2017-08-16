/**
 * PREFIX
 */
const PREFIX = 'dce_';
function formatKey(key) {
  return (PREFIX + key).toUpperCase();
}

/**
 * AUTH
 */
const AUTH_TOKEN = formatKey('token');
const USER_NAME = formatKey('username');
const Tenant = formatKey('tenant');

function getStore(key) {
  return JSON.parse(localStorage.getItem(key));
}

function setStore(key, value) {
  localStorage.setItem(key, JSON.stringify(value));
}

export default {
  // token
  get token() {
    return getStore(AUTH_TOKEN);
  },
  set token(t) {
    setStore(AUTH_TOKEN, t);
  },
  // tenant
  get tenant() {
    return getStore(Tenant);
  },
  set tenant(t) {
    setStore(Tenant, t);
  },
  // userName
  get userName() {
    return getStore(USER_NAME);
  },
  set userName(n) {
    setStore(USER_NAME, n);
  },
  clear: () => {
    localStorage.clear();
  },
};
