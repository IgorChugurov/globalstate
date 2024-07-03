import { Action, AppState } from "../types/types";

export const reducer = (state: AppState, action: Action): AppState => {
  switch (action.type) {
    case "SET_DATA":
      return {
        ...state,
        [action.payload.name]: {
          list: action.payload.data.map((item: any, i: number) => ({
            ...item,
            _id: i + Date.now() + "",
          })),
          loading: false,
        },
      };
    case "CREATE_ITEM":
      return {
        ...state,
        [action.payload.name]: {
          list: [action.payload.data, ...state[action.payload.name].list],
          loading: false,
        },
      };
    case "UPDATE_ITEM":
      return {
        ...state,
        [action.payload.name]: {
          list: state[action.payload.name].list.map((item) =>
            item._id === action.payload._id
              ? { ...item, ...action.payload.data }
              : item
          ),
          loading: false,
        },
      };
    case "DELETE_ITEM":
      return {
        ...state,
        [action.payload.name]: {
          list: state[action.payload.name].list.filter(
            (item) => item._id !== action.payload._id
          ),
          loading: false,
        },
      };
    case "DELETE_MULTIPLE_ITEMS":
      return {
        ...state,
        [action.payload.name]: {
          list: state[action.payload.name].list.filter(
            (item) => !action.payload.ids.includes(item._id)
          ),
          loading: false,
        },
      };
    case "SET_LOADING":
      return {
        ...state,
        [action.payload.name]: {
          ...state[action.payload.name],
          loading: action.payload.loading,
        },
      };
    default:
      return state;
  }
};
