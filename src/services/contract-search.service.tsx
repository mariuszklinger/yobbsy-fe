import axios from 'axios';
import { observable, action } from "mobx";

interface IContractSearchService {
  search: (obj: Contract.IContractFull) => void;
};

class ContractSearchService implements IContractSearchService {
  @observable list: Contract.IContractShort[] = [];

  constructor() { // TODO:
    this.search(null);
  }

  @action
  setContractList(data: Contract.IContractShort[]) {
    this.list = data;
  }

  @action
  search = (obj: Contract.IContractFull) => {
    axios
      .get(`/core/contract?salary=1000000`)
      .then(({ data }: any) => {
        this.setContractList(data.results);
      });
  }
}

export default new ContractSearchService();