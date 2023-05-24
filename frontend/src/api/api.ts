import axios from 'axios';

const API_HOST = process.env.API_HOST || 'http://localhost:9000/v1/';

export const api = axios.create({
  baseURL: API_HOST,
  withCredentials: true,
});
