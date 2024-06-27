import React, { createContext, Dispatch, useReducer } from "react";
import {
  AppState,
  Action,
  ApiRequestFunctions,
  DataItem,
} from "../types/types";
import { reducer } from "./stateReducer";
import { setError } from "../utils";

const initState = {
  state: {},
  dispatch: () => {},
  renewData: () => {},
};

export const GlobalStateContext = createContext<{
  state: AppState;
  dispatch: Dispatch<Action>;
  renewData: (name: string) => any;
}>(initState);

interface StateProviderProps {
  initialConfig: DataItem[];
  apiRequest: ApiRequestFunctions;
  children: React.ReactNode;
}

export const GlobalStateProvider: React.FC<StateProviderProps> = ({
  initialConfig,
  apiRequest,
  children,
}) => {
  const initialState: AppState = initialConfig.reduce(
    (acc: AppState, item: DataItem) => {
      acc[item.name] = { list: [], loading: false };
      return acc;
    },
    {}
  );
  const mapOfUrl: { [key: string]: string } = initialConfig.reduce(
    (acc: { [key: string]: string }, item: DataItem) => {
      acc[item.name] = item.apiUrl;
      return acc;
    },
    {}
  );

  const [state, dispatch] = useReducer(reducer, initialState);

  const renewData = async (name: string) => {
    if (state[name] && state[name].list.length === 0) {
      dispatch({ type: "SET_LOADING", payload: { name, loading: true } });
      apiRequest
        .fetchData(mapOfUrl[name])
        .then((data) => {
          dispatch({ type: "SET_DATA", payload: { name, data } });
        })
        .catch((error) => {
          dispatch({ type: "SET_LOADING", payload: { name, loading: false } });
          setError(error.message);
          setTimeout(() => {
            setError("");
          }, 5000);
          console.log(error.message);
        });
    } else {
      return state[name];
    }
  };

  return (
    <GlobalStateContext.Provider value={{ state, dispatch, renewData }}>
      {children}
    </GlobalStateContext.Provider>
  );
};
