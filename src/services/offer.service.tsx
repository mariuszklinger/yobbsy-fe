import axios, { AxiosResponse } from 'axios';
import { action, observable, computed } from 'mobx';

import userService from './user.service';

class OfferService {
  @observable
  list: Offer.IOffer[] = [];

  @computed
  get getUnreadCount() {
    const isHunter = userService.isHunter;
    const filter = isHunter ?
      (offer: Offer.IOffer) => !offer.seen :
      (offer: Offer.IOffer) => offer.pending;

    return this.list.filter(filter).length;
  }

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