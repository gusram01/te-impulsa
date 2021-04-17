import axios from 'axios';
import qs from 'qs';

const url = process.env.VUE_APP_URL;
const token_business = process.env.VUE_APP_TOKEN;

export const getInfo = () =>
  axios
    .post(`${url}/getPedingServices`, { token_business })
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

export const newService = (service) =>
  axios
    .post(`${url}/newService`, {
      headers: { 'content-type': 'application/x-www-form-urlencoded' },
      data: qs.stringify(service),
    })
    .then((resp) => {
      if (!resp.data.success) {
        throw new Error('Empty data');
      }
      console.log(resp);
      return resp.data.data;
    })
    .catch((err) => {
      console.error(err);
      return [];
    });
