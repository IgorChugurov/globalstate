import React, {
  createContext,
  Dispatch,
  useMemo,
  useReducer,
  useState,
} from "react";
import {
  AppState,
  Action,
  ApiRequestFunctions,
  DataItem,
} from "../types/types";
import { reducer } from "./stateReducer";
import { setError } from "../utils";
import Resultoutput from "../components/resultoutput/Resultuotput";
import ParangaForViewport from "../components/parangaForViewport/ParangaForViewport";
import { UserDataContextProvider } from "./userDataContext";
import { getDarkModeLS, setDarkModeLS } from "../services/localStorage";

import { API } from "../api/apiRequest";

import "../css/index.css";
import "../css/typography.css";
import "../css/colors.css";
import "../css/inputs.css";
import "../css/menu.css";
import "../css/buttons.css";
import "../css/modal.css";

import { createTheme, PaletteMode, ThemeProvider } from "@mui/material";

interface IAuthData {
  loginAndGetTokenUrl: string;
  credentials: {
    varName: string;
    title: string;
    type: string;
  };
  getCurrentAuthUserUrl: string;
  refreshAuthSessionUrl: string;
}

interface IInitalConfig {
  appGlobalStoreConfig: DataItem[];
  TITLE: string;
  VERSION: string;
  STORAGE: string;
  STUDIA: string;
  AuthData: IAuthData;
  LSPrefix: string;
}

const initDarkMode = getDarkModeLS() as PaletteMode;
setModeClassForBody(initDarkMode);
const initState = {
  state: {},
  dispatch: () => {},
  renewData: () => {},
  darkMode: initDarkMode,
  toggleDarkMode: () => {},
  AuthData: {} as IAuthData,
  TITLE: "",
  VERSION: "",
  STORAGE: "",
  STUDIA: "",
  LSPrefix: "",
};

export const GlobalStateContext = createContext<{
  state: AppState;
  dispatch: Dispatch<Action>;
  renewData: (name: string) => any;
  darkMode: PaletteMode;
  toggleDarkMode: () => void;
  AuthData: IAuthData;
  TITLE: string;
  VERSION: string;
  STORAGE: string;
  STUDIA: string;
  LSPrefix: string;
}>(initState);

interface StateProviderProps {
  initialConfig: IInitalConfig;

  children: React.ReactNode;
}

export const GlobalStateProvider: React.FC<StateProviderProps> = ({
  initialConfig,

  children,
}) => {
  const apiRequest: ApiRequestFunctions = API;
  const initialState: AppState = initialConfig.appGlobalStoreConfig.reduce(
    (acc: AppState, item: DataItem) => {
      acc[item.collection] = { list: [], loading: false };
      return acc;
    },
    {}
  );
  const mapOfUrl: { [key: string]: { apiUrl: string; title: string } } =
    initialConfig.appGlobalStoreConfig.reduce(
      (acc: { [key: string]: any }, item: DataItem) => {
        acc[item.collection] = { ...item };
        return acc;
      },
      {}
    );

  const [darkMode, setDarkMode] = useState<PaletteMode>(initState.darkMode);
  const [TITLE] = useState(initialConfig.TITLE);
  const [VERSION] = useState(initialConfig.VERSION);
  const [LSPrefix] = useState(initialConfig.LSPrefix);
  const [AuthData] = useState(initialConfig.AuthData);
  // this only for listItems
  const [state, dispatch] = useReducer(reducer, initialState);

  const toggleDarkMode = () => {
    const mode = darkMode === "dark" ? "light" : "dark";
    setModeClassForBody(mode);
    setDarkMode(mode);
    setDarkModeLS(mode);
  };

  const renewData = async (name: string) => {
    if (state[name] && state[name].list && state[name].list.length === 0) {
      dispatch({ type: "SET_LOADING", payload: { name, loading: true } });
      apiRequest
        .fetchData(mapOfUrl[name].apiUrl)
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

  const theme = useMemo(() => {
    return createTheme({
      palette: { mode: darkMode || "light" },
    });
  }, [darkMode]);

  return (
    <GlobalStateContext.Provider
      value={{
        state,
        dispatch,
        renewData,
        darkMode,
        toggleDarkMode,
        AuthData,
        TITLE,
        VERSION,
        STORAGE: initialConfig.STORAGE,
        STUDIA: initialConfig.STUDIA,
        LSPrefix,
      }}
    >
      <ThemeProvider theme={theme}>
        <UserDataContextProvider>{children}</UserDataContextProvider>
        <Resultoutput />
        <ParangaForViewport />
      </ThemeProvider>
    </GlobalStateContext.Provider>
  );
};

function setModeClassForBody(mode: string) {
  const bodyClassList = document.body.classList;
  // Remove both potential classes to avoid conflicts
  bodyClassList.remove("light", "dark");
  // Add the specified mode as a class
  bodyClassList.add(mode);
}
