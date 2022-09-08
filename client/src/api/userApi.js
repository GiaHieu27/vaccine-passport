import axiosClient from './axiosClient';

const userApi = {
  getAllUser: () => axiosClient.get('/user'),
};

export default userApi;
