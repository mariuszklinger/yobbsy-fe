declare namespace User {
  interface IUser {
    id: number,
    company: string,
    token: string,
    email: string,
    employee: boolean,
    hunter: boolean,
    pending: Offer.IOffer[],
  }
}