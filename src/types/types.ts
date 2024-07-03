export interface DataItem {
  collection: string;
  apiUrl: string;
  title: string;
}

export interface DataEntity {
  list: any[];
  loading: boolean;
}

export interface AppState {
  [key: string]: DataEntity;
}

// export interface AppState {
//   [key: string]: any[];
// }

export interface ActionSetData {
  type: "SET_DATA";
  payload: { name: string; data: any[] };
}

export interface ActionCreateItem {
  type: "CREATE_ITEM";
  payload: { name: string; data: any };
}
export interface ActionUpdateItem {
  type: "UPDATE_ITEM";
  payload: { name: string; _id: string; data: any };
}

interface ActionDeleteItem {
  type: "DELETE_ITEM";
  payload: {
    name: string;
    _id: number;
  };
}

interface ActionDeleteMultipleItems {
  type: "DELETE_MULTIPLE_ITEMS";
  payload: {
    name: string;
    ids: number[];
  };
}

interface ActionSetLoading {
  type: "SET_LOADING";
  payload: {
    name: string;
    loading: boolean;
  };
}

export type Action =
  | ActionSetData
  | ActionUpdateItem
  | ActionCreateItem
  | ActionDeleteItem
  | ActionDeleteMultipleItems
  | ActionSetLoading;
export type Dispatch = (action: Action) => void;

export type ApiRequestFunctions = {
  fetchDataById: <T>(url: string, _id: string) => Promise<T>;
  fetchData: <T>(url: string) => Promise<T[]>;
  updateData: <T>(url: string, _id: number, data: any) => Promise<T>;
  deleteData: (url: string, _id: number) => Promise<void>;
  createData: <T>(url: string, data: any) => Promise<T>;
  deleteMany: (url: string, ids: number[] | string[]) => Promise<void>;
};
