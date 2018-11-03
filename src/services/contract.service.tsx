import axios from 'axios';
import { observable, action } from "mobx";

type callbackType = (list: any) => void;

interface IContractService {
  getTags: (query: string, callback: callbackType) => void;
  getLocations: (query: string, callback: callbackType) => void;
};

export function getContractJson(obj: Contract.IContractFull) {
  const contract: Contract.IContractFull = {
    ...obj,
  };

  contract.locations = obj.locations.map((l: Contract.ILocation) => ({
    name: l.name,
    country: l.country,
  }));

  contract.skills = obj.skills.map((tag: any) => ({
    tag: {
      name: tag.label,
    },
    proficiency: 10,
  }));

  return contract;
}

class ContractService implements IContractService {
  @observable list: Contract.IContractShort[] = [];

  constructor() { // TODO:
    this.search(null);
  }

  @action
  setContractList(data: Contract.IContractShort[]) {
    this.list = data;
  }

  getTags(query: string, callback: callbackType) {
    axios
      .get(`/core/tag?name=${query}`)
      .then(({ data }) => callback(data.results));
  }

  getLocations(query: string, callback: callbackType) {
    axios
      .get(`/core/location?name=${query}`)
      .then(({ data }) => callback(data.results));
  }

  save(obj: Contract.IContractFull) {
    const contract = getContractJson(obj);
    axios
      .post('/core/contract', contract)
      .then(({ data }) => console.log(data));
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

export default new ContractService();