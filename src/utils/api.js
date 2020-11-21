import Axios from 'axios';
import authorize from './authorize';

Axios.interceptors.response.use(
  function (config) {
    return config;
  },
  async function (error) {
    const status = error.response.data.error.status;

    if (status === 401) authorize();

    return Promise.reject(error);
  }
);

export const defaultHeaders = header => {
  const headers = {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${localStorage.token}`,
    ...header,
  };

  if (!localStorage.token) delete headers.Authorization;

  return headers;
};

export default async (url, method = 'GET', headers = {}, data = {}) => {
  const res = await Axios({
    url: `https://api.spotify.com/v1${url}`,
    method,
    data,
    headers: defaultHeaders(headers),
  });
  return res.data;
};
