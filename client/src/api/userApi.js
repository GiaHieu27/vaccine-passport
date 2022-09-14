import axiosClient from './axiosClient';

const endpoit = 'user';

const userApi = {
  getAllUser: () => axiosClient.get(`${endpoit}`),
  getOneUser: (id) => axiosClient.get(`${endpoit}/${id}`),
  createUser: (body) => axiosClient.post(`${endpoit}/createUser`, body),
  updateUser: (id, body) => axiosClient.put(`${endpoit}/${id}`, body),

  vaccinated: (body) => axiosClient.post(`${endpoit}/vaccinated`, body),
};

export default userApi;
