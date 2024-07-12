export interface IGroupCompanies {
  _id: string;
  id: string;
  name: string;
  companies: ICompany[];
  companiesQty: number;
  admins: IAdmin[];
  updatedAt: string;
  createdAt: string;
  settings: ISettings;
}

export interface ICompany {
  _id: string;
  id: string;
  name: string;
  updatedAt: string;
  createdAt: string;
}
export interface IAdmin {
  _id: string;
  id: string;
  name: string;
  email: string;
  updatedAt: string;
  createdAt: string;
}
export interface ISettings {
  _id: string;
  id: string;
  name: string;
  updatedAt: string;
  createdAt: string;
  [key: string]: any;
}
