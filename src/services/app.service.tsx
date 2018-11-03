import { observable, action } from "mobx";

interface IContractService {
  loadingStart: () => void;
  loadingStop: () => void;
};


class AppService implements IContractService {
  @observable isLoading: boolean = false;

  @action
  loadingStart = () => {
    this.isLoading = true;
  }

  @action
  loadingStop = () => {
    this.isLoading = false;
  }

}

export default new AppService();