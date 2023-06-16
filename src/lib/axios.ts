import axios from 'axios';

export const rusN = (window as any).rusN as {
  nonce: string;
  rootapiurl: string;
};

const instance = axios.create({
  baseURL: rusN.rootapiurl,
  timeout: 3000,
});

export default instance;
