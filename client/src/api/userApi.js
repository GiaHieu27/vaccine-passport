import axiosClient from './axiosClient';

const userApi = {
  getAllUser: () => axiosClient.get('/user'),
  createUser: (body) => axiosClient.post('/user/createUser', body),
};

export default userApi;
