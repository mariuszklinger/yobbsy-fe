import axios from 'axios';
import { observable, action } from 'mobx';

type callbackType = (list: any) => void;

export interface IContractService {
  contract: Contract.IContractFull;
  getTags: (query: string, callback: callbackType) => void;
  getLocations: (query: string, callback: callbackType) => void;
  setContract: (contract: Contract.IContractFull) => Contract.IContractFull;
};

export function getContractJson(obj: Contract.IContractFull) {
  const contract: Contract.IContractFull = {
    ...obj,
  };

  contract.locations = obj.locations.map((l: Contract.ILocation) => ({
    name: l.name,
    country: l.country,
  }));

  contract.skills = obj.skills.map((skill: Contract.ISkill) => ({
    ...skill,
    tag: {
      name: skill.tag.name || skill.tag.label,
    }
  }));

  return contract;
}

function getEmptyContract(): Contract.IContractFull {
  return {
    id: null,
    salary: null,
    currency: '',
    title: '',
    description: '',
    locations: [],
    notice: 0,
    skills: [] as any[],
    email: '',
  };
}

class ContractService implements IContractService {
  @observable contract: Contract.IContractFull = {
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
      {
        proficiency: 10,
        tag: { value: '1', label: 'java', name: 'java' },
      },
      {
        proficiency: 10,
        tag: { value: '2', label: 'javascript', name: 'javascript' },
      }
    ],
    email: 'dasdas21312zda@asdsada.pl',
  };

  clear() {
    this.setContract(getEmptyContract());
  }

  @action
  setContract = (contract: Contract.IContractFull) => {
    this.contract = contract;
    return this.contract;
  }

  getContract(id: number) {
    return axios
      .get(`/core/contract/${id}`)
      .then(({ data }) => this.setContract(data));
  }

  confirmContract(id: string, hash: string) {
    return axios
      .patch(`/core/contract/${id}/confirm-contract?hash=${hash}`);
  }

  confirmAccount(email: string, hash: string) {
    return axios
      .get(`/core/confirm-account?email=${email}&token=${hash}`);
  }

  deleteContract(id: number) {
    return axios
      .delete(`/core/contract/${id}`);
  }

  getTags(query: string, callback: callbackType) {
    const cbw = (e:any) => {
      return callback(e);
    }

    axios
      .get(`/core/tag?name=${query}`)
      .then(({ data }) => cbw(data.results));
  }

  getLocations(query: string, callback: callbackType) {
    axios
      .get(`/core/location?name=${query}`)
      .then(({ data }) => callback(data.results));
  }

  save = () => {
    const contract = getContractJson(this.contract);
    const method = contract.id ? axios.put : axios.post;
    const url = contract.id ? `/core/contract/${contract.id}` : '/core/contract';

    method(url, contract)
      .then(({ data }) => console.log(data));
  }

}

export default new ContractService();