import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:3333',
});

api.interceptors.request.use(
  async config => {
    const token = localStorage.getItem('@synvia:token');

    if (token != null && token !== '') {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  async error => await Promise.reject(error),
);

export { api };
