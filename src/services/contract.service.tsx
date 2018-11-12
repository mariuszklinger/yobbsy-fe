import axios from 'axios';
import { observable, action } from 'mobx';

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
  @observable contract: Contract.IContractFull = {
    id: 7,
    salary: 5000,
    currency: 'USD',
    title: 'CEO of stuff',
    description: 'I know everything, have a lot experience, give me the job. Lorem ipsum solor et al mirl.',
    locations: [
      { value: 321, label: 'Pabianice, Poland', name: 'Pabianice', country: 'Poland' },
      { value: 5124, label: 'Gdańsk, Poland', name: 'Gdańsk', country: 'Poland' },
    ],
    notice: 0,
    skills: [
      { value: '1', label: 'java' },
      { value: '2', label: 'javascript' },
      { value: '3', label: 'python' }
    ] as any[],
    email: 'dasdas21312zda@asdsada.pl',
  };

  @action
  setContract = (contract: Contract.IContractFull) => {
    // console.log(contract);
    this.contract = contract;
    return contract;
  }

  async getContract(id: number) {
    return axios
      .get(`/core/contract/${id}`)
      .then(({ data }) => this.setContract(data));
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
}

export default new ContractService();