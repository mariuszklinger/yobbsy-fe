import { observable, action } from "mobx";

interface IContractService {
  loadingStart: () => void;
  loadingStop: () => void;
};

class AppService implements IContractService {
  @observable isLoading: boolean = false;
  @observable success: boolean = false;

  @action
  loadingStart = () => {
    this.isLoading = true;
  }

  @action
  loadingStop = () => {
    this.isLoading = false;
  }

  @action
  showToaster = (name: Common.ToasterType, msg?: string) => {
    this[name] = true;
  }

  @action
  hideToaster = (name: Common.ToasterType, msg?: string) => {
    this[name] = false;
  }

}

export default new AppService();