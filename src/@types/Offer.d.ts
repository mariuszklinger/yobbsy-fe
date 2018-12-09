// TODO:
declare namespace Offer {
  interface IOffer {
    id: number,
    approved: boolean,
    pending: boolean,
    hunter: number,
    feedback: string,
    description: string,
    link: string,
    modified: string,
    details: Contract.IContractFull,
  }
}

// "approved": true,
// "pending": true,
// "contract": 1,
// "hunter": 1,
// "description": "sdadasdasd\n",
// "modified": null,
// "link": "http://sadasdasd.pl"