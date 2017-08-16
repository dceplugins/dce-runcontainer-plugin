import { $http } from '@/config/const';

function getIpMap() {
  return $http.get(`/api/nodes-utils/ip-map`)
    .then(res => res.data);
}

export default {
  getIpMap,
}
