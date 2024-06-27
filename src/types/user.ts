export interface IUser {
  _id: string;
  id?: number;
  name: string;
  email: string;
  role: { _id: string; role: string };
  permissions: string[];
  token: string;
  refreshToken: string;
}
export interface IRole {
  _id: string;
  role: string;
}
export enum RoleList {
  SuperAdmin = "SuperAdmin",
  Admin = "Admin",
  User = "User",
  Editor = "Editor",
}
