import { sendRequest } from "./request";
import { IListResponse, IPaginate } from "../types/request";
import { IProduct } from "../types/poduct";

export interface IEntity {
  _id: string;
  name: string;
  [key: string]: string;
}
// export interface IApiService<T> {
//   deleteMany: (d: any) => Promise<any>;
//   deleteOne: (d: string) => Promise<any>;
//   updagteOne: (d: T) => Promise<T>;
//   createOne: (d: T) => Promise<T>;
//   getOne: (d: string) => Promise<T>;
//   getAll: () => Promise<T[]>;
// }

class ApiService<T extends IEntity, U extends boolean = false> {
  constructor(
    private endpoint: string,
    private options?: { create: string },
    private useListResponse: U = false as U
  ) {}

  getAll = (
    paginate?: IPaginate
  ): Promise<U extends true ? IListResponse<T> : T[]> => {
    return new Promise((resolve, reject) => {
      const req = {
        url: `${this.endpoint}`,
        method: "GET",
        queryString: paginate?.query,
        page: paginate?.currentPage,
        perPage: paginate?.perPage,
        search: paginate?.search,
        limit: paginate?.perPage,
        skip:
          (paginate?.perPage || 0) *
          (paginate?.currentPage ? paginate?.currentPage - 1 : 0),
      };

      sendRequest(req).then(resolve, reject);
    });
  };

  getOne = (id: string): Promise<T> => {
    return new Promise((resolve, reject) => {
      const req = {
        url: `${this.endpoint}/${id}`,
        method: "GET",
      };
      sendRequest(req).then(resolve, reject);
    });
  };

  create = (body: Omit<T, "_id">): Promise<T> => {
    const url = this.options?.create
      ? this.endpoint + this.options.create
      : this.endpoint;
    return new Promise((resolve, reject) => {
      const req = {
        url: url,
        method: "POST",
        body,
      };
      sendRequest(req).then(resolve, reject);
    });
  };

  update = (id: string, body: T): Promise<T> => {
    return new Promise((resolve, reject) => {
      const req = {
        url: `${this.endpoint}/${id}`,
        method: "PUT",
        body,
      };
      sendRequest(req).then(resolve, reject);
    });
  };

  deleteOne = (id: string): Promise<void> => {
    return new Promise((resolve, reject) => {
      const req = {
        url: `${this.endpoint}/${id}`,
        method: "DELETE",
      };
      sendRequest(req).then(resolve, reject);
    });
  };

  deleteMany = (body: { ids: string[] }): Promise<void> => {
    return new Promise((resolve, reject) => {
      const req = {
        url: `${this.endpoint}/delete-many`,
        method: "PUT",
        body,
      };
      sendRequest(req).then(resolve, reject);
    });
  };
}

export const servicesPackage: { [key: string]: any } = {
  products: new ApiService<IProduct>("https://dummyjson.com/products", {
    create: "/add",
  }),
};
