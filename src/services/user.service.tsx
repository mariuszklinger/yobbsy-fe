import { observable, action, computed } from "mobx";
import axios from 'axios';

interface IUserService {
  isLoggedIn: boolean,
  isHunter: boolean,
  isEmployee: boolean,
}

class UserService implements IUserService {
  @observable userData: any = {};
  @observable isLogInFormOpened: boolean = false;

  constructor() {
    const user = localStorage.getItem('userData');
    if (user) {
      this.setUserData({ data: JSON.parse(user) });
    }
  }

  @computed get isLoggedIn() {
    return !!this.userData.token;
  }

  @computed get isHunter() {
    return !!this.userData.hunter;
  }

  @computed get isEmployee() {
    return !!this.userData.employee;
  }

  @action
  openLoginForm = () => this.isLogInFormOpened = true

  @action
  closeLoginForm = () => this.isLogInFormOpened = false

  @action
  setUserData = ({ data }: any) => {
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

    axios.post('/core/api-token-auth', formdata, config)
      .then(this.setUserData)
      .then(this.closeLoginForm);
  }
}

export default new UserService();
