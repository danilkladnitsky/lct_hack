import axios from 'axios';

const API_HOST = process.env.API_HOST || 'https://api.lct.x1kk4.ru/';

export const api = axios.create({
  baseURL: API_HOST,
  withCredentials: true,
});
