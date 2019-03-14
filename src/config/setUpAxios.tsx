import axios from 'axios';
import get from 'lodash-es/get';

import AppService from '../services/app.service';

interface ENV_DICT {
  [key: string]: string,
}

const BACKEND_API: ENV_DICT = {
  production: 'https://yobbsy-back.herokuapp.com',
  development: 'http://localhost:8000',
};

axios.defaults.baseURL = BACKEND_API[process.env.NODE_ENV || 'development'];

const onRequestStart = (config: any) => {
  AppService.loadingStart();
  return config;
}

const onRequestStop = (config: any) => {
  AppService.loadingStop();
  return config;
}

const getResponseCallback = (cbType: Common.ToasterType) => (data: any) => {
  const { config } = data;

  const DEFAULT_MESSAGE = {
    'success': 'Success!',
    'error': 'Error occured'
  }

  AppService.loadingStop();

  if (config.method !== 'get') {
    const message = get(data, 'response.data.error', DEFAULT_MESSAGE[cbType]);
    AppService.showToaster(cbType, message);
  }

  if (cbType === 'error') {
    return Promise.reject(data);
  }

  return data;
}

axios.interceptors.request.use(onRequestStart, onRequestStop);
axios.interceptors.response.use(
  getResponseCallback('success'),
  getResponseCallback('error')
);