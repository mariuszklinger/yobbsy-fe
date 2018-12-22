import axios from 'axios';
import get from 'lodash-es/get';

import AppService from '../services/app.service';

axios.defaults.baseURL = 'http://localhost:8000';

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
  return data;
}

axios.interceptors.request.use(onRequestStart, onRequestStop);
axios.interceptors.response.use(
  getResponseCallback('success'),
  getResponseCallback('error')
);