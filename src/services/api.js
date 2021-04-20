import axios from 'axios';

const url = process.env.VUE_APP_URL;
const token_business = process.env.VUE_APP_TOKEN;

export const getInfo = () =>
  axios
    .post(`${url}/getPedingServices`, { token_business })
    .then((resp) => {
      if (!resp.data.success) {
        throw new Error('Empty data');
      }
      console.log(resp.data.data);
      return resp.data.data;
    })
    .catch((err) => {
      console.error(err);
      return [];
    });

export const getServiceById = (orderCode) => {
  const params = new URLSearchParams();

  params.append('order_code', orderCode);

  return axios
    .get(`${url}/serviceDetail`, params)
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
export const newService = (service) => {
  const params = new URLSearchParams();

  Object.entries(service).forEach(([key, val]) => {
    params.append(key, val);
  });
  return axios
    .post(`${url}/newService`, params)
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
