// TODO:
declare namespace Offer {
  interface IOffer {
    approved: boolean,
    pending: boolean,
    hunter: number,
    description: string,
    link: string,
    contract?: Contract.IContractFull,
  }
}

// "approved": true,
// "pending": true,
// "contract": 1,
// "hunter": 1,
// "description": "sdadasdasd\n",
// "modified": null,
// "link": "http://sadasdasd.pl"