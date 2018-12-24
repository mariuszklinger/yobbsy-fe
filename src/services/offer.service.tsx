import axios, { AxiosResponse } from 'axios';
import { action, observable } from 'mobx';

class OfferService {
  @observable
  list: Offer.IOffer[] = [];

  @action
  setOffers = (list: Offer.IOffer[]) => {
    this.list = list;
  }

  answer = async (offerId: number, approved: boolean, feedback: string) => {
    const params = {
      approved,
      feedback,
    };

    return axios
      .put(`/core/offer/${offerId}/answer`, params)
      .then(({ data }) => console.log(data));
  }

  markAsSeen = async (offerId: number) => {
    return axios
      .put(`/core/offer/${offerId}/mark-as-seen`)
      .then(({ data }) => console.log(data));
  }

  async createOffer(contractId: number, message: string) {
    const params = {
      description: message,
      contract: contractId,
    };

    return axios
      .post(`/core/offer`, params)
      .then(({ data }) => console.log(data));
  }

  getOffers = async () => {
    const onGetOffers = ({ data }: AxiosResponse) => {
      this.setOffers(data.results);
    };

    return axios
      .get('/core/offer')
      .then(onGetOffers);
  }

}

export default new OfferService();