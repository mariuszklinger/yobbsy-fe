import axios from 'axios';
import { observable, action } from "mobx";

interface IContractSearchService {
  search: (obj: Contract.IContractFull) => void;
};

class ContractSearchService implements IContractSearchService {
  @observable list: Contract.IContractShort[] = [];

  clearList = () => {
    this.setContractList([]);
  }

  @action
  setContractList(data: Contract.IContractShort[]) {
    this.list = data;
  }

  @action
  search = (values: any) => { // TODO:
    return axios
      .get(`/core/contract?salary=1000000`)
      .then(({ data }: any) => {
        this.setContractList(data.results);
      })
      .catch((error) => { console.log(error)});
  }

  @action
  getMyContracts = () => {
    return axios
      .get(`/core/contract/my_contracts`)
      .then(({ data }: any) => {
        this.setContractList(data.results);
      }, this.clearList);
  }
}

export default new ContractSearchService();