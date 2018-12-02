declare namespace Contract {
  interface ILocation {
    value?: number,
    label?: string,
    name: string,
    country: string,
  }

  interface ITag {
    id?: number,
    label?: string,
    name?: string,
    value?: number,
  }

  interface ISkill {
    proficiency: number,
    tag: ITag,
  }

  interface IContractShort {
    id?: number,
    salary: number,
    currency: string,
    title: string,
    description: string,
    locations: ILocation[],
    skills: ISkill[],
    notice: number,
    created?: string,
    modified?: string,
  }

  interface IContractFull extends IContractShort{
    email?: string,
    password?: string,
    password2?: string,
  }
}