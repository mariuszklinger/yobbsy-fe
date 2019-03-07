import { observable, action, computed } from "mobx";
import axios from 'axios';
import get from 'lodash-es/get';

import offerService from './offer.service';
import { AUTH_MODAL_MODE } from '../components/AuthModal';

interface IUserService {
  isLoggedIn: boolean,
  isHunter: boolean,
  isEmployee: boolean,
}

class UserService implements IUserService {
  @observable userData: User.IUser = null;

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
    this.setAuthToken();

    localStorage.setItem('userData', JSON.stringify(data));
  }

  setAuthToken = () => {
    const token = `Token ${this.userData.token}`
    axios.defaults.headers.common.Authorization = token;
  }

  logIn(username: string, password: string) {
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
      .then(this.closeLoginForm);
  }

  register({ email, password, hunter = true, company}: any) {
    const formdata = new FormData();
    formdata.set('username', email);
    formdata.set('password', password);
    formdata.set('hunter', `${hunter}`);
    formdata.set('company', company);

    const config = {
      headers: { 'Content-Type': 'multipart/form-data' },
    };

    axios
      .post('/core/register', formdata, config);
  }
}

export default new UserService();
