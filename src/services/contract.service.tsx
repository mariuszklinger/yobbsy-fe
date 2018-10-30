import axios from 'axios';

type callbackType = (list: any) => void;

interface IContractService {
  getTags: (query: string, callback: callbackType) => void;
  getLocations: (query: string, callback: callbackType) => void;
};

interface IContract {
  notice: number;
  locations: string[];
  salary: number;
  currency: string;
  description: string;
  email: string;
  skills: any[];
}

export function getContractJson(obj: any) {
  const contract: IContract = {
    description: obj.description,
    salary: obj.salary,
    currency: obj.currency,
    notice: obj.notice,
    email: obj.email,
    locations: [],
    skills: [],
  };

  contract.locations = obj.locations.map((l: any) => ({
    name: l.name,
    country: l.country,
  }));

  contract.skills = obj.tags.map((tag: any) => ({
    tag: {
      name: tag.label,
    },
    proficiency: 10,
  }));

  axios
    .post('/core/contract', contract)
    .then(({ data }) => console.log(data));

  return contract;
}

class ContractService implements IContractService {
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

  saveContract(obj: any) {
    return getContractJson(obj);
  }
}

export default new ContractService();