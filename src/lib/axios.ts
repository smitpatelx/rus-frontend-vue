import axios from 'axios';

const rusN = (window as any).rusN as {
  nonce: string;
  rootapiurl: string;
};

const instance = axios.create({
  baseURL: rusN.rootapiurl,
  timeout: 1000,
  headers: { 'X-WP-Nonce': rusN.nonce },
});

export default instance;