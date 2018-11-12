import axios from 'axios';
import AppService from '../services/app.service';

axios.defaults.baseURL = 'http://localhost:8000';
axios.defaults.headers.common.Authorization = '1337';

const onRequestStart = (config: any) => {
  AppService.loadingStart();
  return config;
}

const onRequestStop = (config: any) => {
  AppService.loadingStop();
  return config;
}

const getResponseCallback = (cbType: 'success' | 'error') => (response: any) => {
  const { config } = response;
  AppService.loadingStop();

  if (config.method !== 'get') {
    AppService.showToaster(cbType as Common.ToasterType.SUCCESS);
  }
  return response;
}

axios.interceptors.request.use(onRequestStart, onRequestStop);
axios.interceptors.response.use(
  getResponseCallback('success'),
  getResponseCallback('error')
);