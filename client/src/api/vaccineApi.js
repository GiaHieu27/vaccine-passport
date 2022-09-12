import axiosClient from './axiosClient';

const endpoint = 'vaccine';

const vaccineApi = {
  getAllVaccine: () => axiosClient.get(endpoint),
  getOneVaccine: (id) => axiosClient.get(`${endpoint}/${id}`),
  createVaccine: (body) => axiosClient.post(`${endpoint}/createVaccine`, body),
  updateVaccine: (id, body) => axiosClient.put(`${endpoint}/${id}`, body),
  deleteVaccine: (id) => axiosClient.delete(`${endpoint}/${id}`),
};

export default vaccineApi;
