import axios from 'axios';

const baseUrl = '/api/users';

const list_users = (user, config) => {
  const request = axios.post(baseUrl, user, config);
  return request.then(response => response.data);
};

const deleter = (id, conf) => {
  const request = axios.delete(`${baseUrl}/${id}`, conf);
  return request.then(response => response.data);
}

const add_user = (newUser, conf) => {
  const request = axios.post(`${baseUrl}/add`, newUser, conf);
  return request.then(resp => resp.data);
}

const upd_pw = (data, conf) => {
  const request = axios.post(`${baseUrl}/password`, data, conf);
  return request.then(resp => resp.data);
}

const get_feedback = () => {
  const request = axios.post('/api/feedback/');
  return request.then(resp => resp.data);
}

const send_feedback = (data) => {
  const request = axios.post('/api/feedback/add', data);
  return request.then(resp => resp.data);
}

const del_feedback = (id) => {
  const request = axios.delete(`/api/feedback/${id}`);
  return request.then(resp => resp.data);
}

export default { list_users, deleter, add_user, upd_pw, get_feedback, send_feedback, del_feedback };