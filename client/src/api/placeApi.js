import axiosClient from './axiosClient';

const endpoit = 'place';

const placeApi = {
  getAllPlace: () => axiosClient.get(`${endpoit}`),
  getOnePlace: (id) => axiosClient.get(`${endpoit}/${id}`),
};

export default placeApi;
