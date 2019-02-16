declare namespace User {
  interface IUser {
    id: number,
    token: string,
    email: string,
    employee: { // TODO:
      id: number,
      user: number,
      company: string,
      points: number,
    },
    hunter: {
      company: string,
      points: number,
    },
    pending: Offer.IOffer[],
  }
}