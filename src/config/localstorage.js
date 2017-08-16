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

export default {
  // token
  get token() {
    return localStorage.getItem(AUTH_TOKEN);
  },
  set token(t) {
    localStorage.setItem(AUTH_TOKEN, t);
  },
  // tenant
  get tenant() {
    return localStorage.getItem(Tenant);
  },
  set tenant(t) {
    localStorage.setItem(Tenant, t);
  },
  // userName
  get userName() {
    return localStorage.getItem(USER_NAME);
  },
  set userName(n) {
    localStorage.setItem(USER_NAME, n);
  },
  clear: () => {
    localStorage.clear();
  },
};
