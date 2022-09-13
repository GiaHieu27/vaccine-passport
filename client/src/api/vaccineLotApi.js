import axiosClient from './axiosClient';

const endpoint = 'vaccine/lot';

const vaccineApi = {
  getAllVaccineLot: () => axiosClient.get(`${endpoint}/get-all`),
  getOneVaccineLot: (id) => axiosClient.get(`${endpoint}/${id}`),
  createVaccineLot: (body) =>
    axiosClient.post(`${endpoint}/createVaccineLot`, body),
  updateVaccineLot: (id, body) => axiosClient.put(`${endpoint}/${id}`, body),
  deleteVaccineLot: (id) => axiosClient.delete(`${endpoint}/${id}`),
};

export default vaccineApi;
