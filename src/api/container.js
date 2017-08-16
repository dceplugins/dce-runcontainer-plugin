import {
  $http
} from '@/config/const';

function create(name, spec, hostUrl='') {
  return $http.post(`${hostUrl}/containers/create?name=${name}`, spec)
    .then(res => res.data);
}

function start(id) {
  return $http.post(`/containers/${id}/start`)
    .then(res => res.data);
}

export default {
  create,
  start
}
