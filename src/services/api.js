import axios from 'axios';

const url = process.env.VUE_APP_URL;
const token_business = process.env.VUE_APP_TOKEN;

const postActionListServices = (action) => {
  const enumAction = {
    pending: 'getPedingServices',
    history: 'historicServices',
  };

  return axios
    .post(`${url}/${enumAction[action]}`, { token_business })
    .then((resp) => {
      if (!resp.data.success) {
        throw new Error('Empty data');
      }
      return {
        ok: true,
        data: resp.data.data,
      };
    })
    .catch((error) => {
      console.error(error);
      return {
        ok: false,
        data: [],
        error,
      };
    });
};

const postActionById = (orderCode, action) => {
  const params = new URLSearchParams();
  const enumAction = {
    detail: 'serviceDetail',
    finish: 'finishService',
    delete: 'deleteService',
  };
  params.append('order_code', orderCode);

  return axios
    .post(`${url}/${enumAction[action]}`, params)
    .then((resp) => {
      if (!resp.data.success) {
        throw new Error('Empty data');
      }
      return {
        orderCode,
        data: resp.data.data,
      };
    })
    .catch((error) => {
      console.error(error);
      return {
        error,
        data: [],
      };
    });
};

export const getInfo = () => postActionListServices('pending');

export const getHistory = () => postActionListServices('history');

export const getServiceById = (orderCode) =>
  postActionById(orderCode, 'detail');

export const finishServiceById = (orderCode) =>
  postActionById(orderCode, 'finish');

export const deleteServiceById = (orderCode) =>
  postActionById(orderCode, 'delete');

export const getComunas = () =>
  axios
    .get('https://teimpulsamos.cl/api/v1/helper/getComunas')
    .then((resp) => {
      if (!resp.data.success) {
        throw new Error('Empty data');
      }
      return resp.data.data;
    })
    .catch((error) => {
      console.error(error);
      return [];
    });

export const getPendingByDate = (day, month, year) => {
  const params = new URLSearchParams();

  params.append('day', day);
  params.append('month', month);
  params.append('year', year);
  params.append('token_business', token_business);

  return axios
    .post(`${url}/getPedingServicesByDate`, params)
    .then((resp) => {
      if (!resp.data.success) {
        throw new Error('Empty data');
      }
      return resp.data.data;
    })
    .catch((err) => {
      console.error(err);
      return [];
    });
};

export const newService = (service) => {
  const params = new URLSearchParams();

  Object.entries(service).forEach(([key, val]) => {
    params.append(key, val);
  });
  return axios
    .post(`${url}/newService`, params)
    .then((resp) => {
      console.log(resp);
      if (!resp.data.success) {
        throw new Error('Empty data');
      }
      return resp.data.data;
    })
    .catch((err) => {
      console.error(err);
      return [];
    });
};
