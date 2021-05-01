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
    .post(`${url}/serviceDetail`, params)
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

export const finishServiceById = (orderCode) => {
  const params = new URLSearchParams();

  params.append('order_code', orderCode);

  return axios
    .post(`${url}/finishService`, params)
    .then((resp) => {
      console.error(JSON.stringify(resp.data));
      if (!resp.data.success) {
        throw new Error('Empty data');
      }
      return resp.data.success;
    })
    .catch((err) => {
      console.error(err);
      return err;
    });
};

export const deleteServiceById = (orderCode) => {
  const params = new URLSearchParams();

  params.append('order_code', orderCode);

  return axios
    .post(`${url}/deleteService`, params)
    .then((resp) => {
      console.error(JSON.stringify(resp.data));
      if (!resp.data.success) {
        throw new Error('Empty data');
      }
      return resp.data.success;
    })
    .catch((err) => {
      console.error(err);
      return err;
    });
};

export const getPendingByDate = (day, month, year) => {
  const params = new URLSearchParams();

  params.append('day', day);
  params.append('month', month);
  params.append('year', year);
  params.append('token_business', token_business);

  return axios
    .post(`${url}/getPedingServicesByDate`, params)
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
