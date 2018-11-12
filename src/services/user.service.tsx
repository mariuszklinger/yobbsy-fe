import { observable, action, computed } from "mobx";
import axios from 'axios';

// interface IUserService {
//   isLoggedIn: () => boolean;
// };

class UserService {
  @observable userData: any = {};
  @observable isLogInFormOpened: boolean = false;

  @computed get isLoggedIn() {
    return !!this.userData.loggedIn;
  }

  @action
  openLoginForm = () => this.isLogInFormOpened = true

  @action
  closeLoginForm = () => this.isLogInFormOpened = false

  @action
  setUserData = (data: any) => {
    this.userData = data;
  }

  logIn(username: string, password: string) {
    const formdata = new FormData();
    formdata.set('username', username);
    formdata.set('password', password);

    const config = {
      headers: { 'Content-Type': 'multipart/form-data' },
    };

    axios.post('/core/api-token-auth', formdata, config)
      .then(({ data }: any) => this.setUserData(data))
      .then(this.closeLoginForm);
  }
}

export default new UserService();