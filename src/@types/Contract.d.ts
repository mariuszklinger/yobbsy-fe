declare namespace Contract {
  interface ILocation {
    value?: number,
    label?: string,
    name: string,
    country: string,
  }

  interface IContractShort {
    id?: number,
    salary: number,
    currency: string,
    title: string,
    description: string,
    locations: ILocation[],
    skills: any[],
    notice: number,
  }

  interface IContractFull extends  IContractShort{
    email?: string,
    password?: string,
    password2?: string,
  }
}