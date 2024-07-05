import React, { useState, createContext, useContext, useEffect } from "react";
import { getUser } from "../services/localStorage";
import { IUser } from "../types/user";
import LoginPage from "../pages/login/Login";
import { GlobalStateContext } from "./GlobalStateProvider";
import { createLoginMessageHandler } from "requestwithrefreshtoken";

const INIT_USER: IUser | null = getUser();

const defaultState = {
  userData: INIT_USER,
};
interface IContext {
  userData: IUser | null;
}
interface Props {
  children: React.ReactNode;
}
export const UserDataContext = createContext<IContext>(defaultState);
export const UserDataContextProvider: React.FC<Props> = ({ children }) => {
  const [userData, setUserDataContenxt] = useState(defaultState.userData);
  const { LSPrefix } = useContext(GlobalStateContext);

  const { VITE_SSOSERVERURL: SSOSERVERURL } = import.meta.env;
  // use this funtion to create a message handler for the login event from iframe auth server
  // and save the user data to local storage
  // in the login component of the application we use watcher to listen for changes in the local storage and update the user state
  // lskey - prefix for the local storage key

  useEffect(() => {
    const handleLoginMessage = createLoginMessageHandler({
      lskey: `${LSPrefix}-user`,
      ssoserverurl: SSOSERVERURL,
      callback: (data: any) => {
        setUserDataContenxt(data.user);
        //setTimeout(() => (window.location.href = "/"), 100);
      },
    });

    window.addEventListener("message", handleLoginMessage, false);

    return () => {
      window.removeEventListener("message", handleLoginMessage);
    };
  }, []);

  // watchAnyObject(
  //   window.localStorage,
  //   ["setItem", "getItem", "removeItem"],
  //   (method, key, ...args) => {
  //     console.log(method, key, args);
  //     if (method === "setItem" && key === `${LSPrefix}`) {
  //       try {
  //         const data = JSON.parse(args[0]);
  //         console.log(args[0]);
  //         setUserDataContenxt(data);
  //       } catch (error) {
  //         console.log("error", error);
  //       }
  //     }
  //   }
  // );

  return (
    <UserDataContext.Provider
      value={{
        userData,
      }}
    >
      {userData ? children : <LoginPage />}
    </UserDataContext.Provider>
  );
};

// function watchAnyObject<T extends object>(
//   object: T,
//   methods: Array<keyof T>,
//   callbackBefore: (method: string, ...args: any[]) => void = () => {},
//   callbackAfter: (method: string, ...args: any[]) => void = () => {}
// ): void {
//   methods.forEach((method) => {
//     const originalMethod = object[method];

//     if (typeof originalMethod === "function") {
//       const original = originalMethod.bind(object);
//       const newMethod = function (this: T, ...args: any[]): any {
//         callbackBefore(method as string, ...args);
//         const result = original.apply(this, args);
//         callbackAfter(method as string, ...args);
//         return result;
//       };

//       object[method] = newMethod as unknown as T[keyof T];
//     }
//   });
// }
