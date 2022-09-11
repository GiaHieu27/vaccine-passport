import axiosClient from './axiosClient';

const userApi = {
  getAllUser: () => axiosClient.get('/user'),
  getOneUser: (id) => axiosClient.get(`/user/${id}`),
  createUser: (body) => axiosClient.post('/user/createUser', body),
  updateUser: (id, body) => axiosClient.put(`/user/${id}`, body),
};

export default userApi;
