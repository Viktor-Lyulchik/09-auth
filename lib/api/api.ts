import axios from 'axios';
import { API_URL } from '../helpers';

const BASE_URL = API_URL + '/api';

export const nextServer = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
});
