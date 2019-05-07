import { observable, action } from "mobx";

interface IContractService {
  loadingStart: () => void;
  loadingStop: () => void;
};

class AppService implements IContractService {
  @observable isLoading: boolean = false;

  @observable toasterActive: boolean = false;
  @observable toasterType: Common.ToasterType | null = null;
  @observable toasterMessage: string = '';

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
    this.toasterActive = true;
    this.toasterType = name;
    this.toasterMessage = msg!;
  }

  @action
  hideToaster = () => {
    this.toasterActive = false;
  }

}

export default new AppService();