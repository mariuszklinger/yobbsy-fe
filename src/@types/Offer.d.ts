declare namespace Offer {
  interface IOffer {
    id: number,
    approved: boolean,
    seen: boolean,
    pending: boolean,
    hunter: number,
    feedback: string,
    description: string,
    link: string,
    modified: string,
    details: Contract.IContractFull,
  }
}