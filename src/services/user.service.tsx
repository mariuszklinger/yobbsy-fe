import axios from 'axios';
import get from 'lodash-es/get';
import { observable, action, computed } from "mobx";

import offerService from './offer.service';
import { AUTH_MODAL_MODE } from '../components/AuthModal';
import { history } from '../config/history';

interface IUserService {
  isLoggedIn: boolean,
  isHunter: boolean,
  isEmployee: boolean,
}

class UserService implements IUserService {
  @observable userData?: User.IUser;

  @observable loading: boolean = false;

  @observable isLogInFormOpened: boolean = false;
  @observable authModalMode: AUTH_MODAL_MODE = AUTH_MODAL_MODE.LOGIN;

  constructor() {
    const user = localStorage.getItem('userData');
    if (user) {
      this.setUserData({ data: JSON.parse(user) });
      offerService.getOffers();
    }
  }

  @computed get isLoggedIn() {
    return !!get(this, 'userData.token', false);
  }

  @computed get isHunter() {
    return !!get(this, 'userData.hunter', false);
  }

  @computed get isEmployee() {
    return !!get(this, 'userData.employee', false);
  }

  @action
  openLoginForm = (mode: AUTH_MODAL_MODE = AUTH_MODAL_MODE.LOGIN) => {
    this.authModalMode = mode;
    this.isLogInFormOpened = true;
    setTimeout(() => document.body.style.overflow = 'auto', 0);
  }

  @action
  closeLoginForm = () => this.isLogInFormOpened = false

  @action
  toggleAuthModalMode = () => {
    this.authModalMode = this.authModalMode === AUTH_MODAL_MODE.LOGIN ? AUTH_MODAL_MODE.REGISTER : AUTH_MODAL_MODE.LOGIN;
  }

  @action
  setUserData = ({ data }: { data: User.IUser }) => {
    this.userData = data;
    this.loading = false;
    this.setAuthToken();

    localStorage.setItem('userData', JSON.stringify(data));
  }

  setAuthToken = () => {
    const token = `Token ${this.userData!.token}`
    axios.defaults.headers.common.Authorization = token;
  }

  @action
  logIn(username: string, password: string) {
    this.loading = true;

    const formdata = new FormData();
    formdata.set('username', username);
    formdata.set('password', password);

    const config = {
      headers: { 'Content-Type': 'multipart/form-data' },
    };

    axios
      .post('/core/api-token-auth', formdata, config)
      .then(this.setUserData)
      .then(offerService.getOffers)
      .then(this.closeLoginForm)
      .then(() => history.push('/my-contracts'));
  }

  @action
  logOut = () => {
    this.userData = undefined;
    delete axios.defaults.headers.common.Authorization;
    localStorage.removeItem('userData');
    history.push('/');
  }

  @action
  onRegisterSuccess = (data: any) => {
    this.loading = false;
    return data;
  }

  @action
  register({ email, password, hunter = true, company}: any) {
    const formdata = new FormData();
    formdata.set('username', email);
    formdata.set('password', password);
    formdata.set('hunter', `${hunter}`);
    formdata.set('company', company);

    this.loading = true;

    const config = {
      headers: { 'Content-Type': 'multipart/form-data' },
    };

    return axios
      .post('/core/register', formdata, config)
      .then(this.onRegisterSuccess);
  }
}

export default new UserService();
