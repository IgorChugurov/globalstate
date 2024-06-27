import React, { useState, createContext } from "react";
import { getUser } from "../services/localStorage";
import { IUser } from "../types/user";
import { LSPrefix } from "../appdata.json";

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

  watchAnyObject(
    window.localStorage,
    ["setItem", "getItem", "removeItem"],
    (method, key, ...args) => {
      if (method === "setItem" && key === `${LSPrefix}-user`) {
        try {
          const data = JSON.parse(args[0]);
          setUserDataContenxt(data);
        } catch (error) {}
      }
    }
  );

  return (
    <UserDataContext.Provider
      value={{
        userData,
      }}
    >
      {children}
    </UserDataContext.Provider>
  );
};

function watchAnyObject<T extends object>(
  object: T,
  methods: Array<keyof T>,
  callbackBefore: (method: string, ...args: any[]) => void = () => {},
  callbackAfter: (method: string, ...args: any[]) => void = () => {}
): void {
  methods.forEach((method) => {
    const originalMethod = object[method];

    if (typeof originalMethod === "function") {
      const original = originalMethod.bind(object);
      const newMethod = function (this: T, ...args: any[]): any {
        callbackBefore(method as string, ...args);
        const result = original.apply(this, args);
        callbackAfter(method as string, ...args);
        return result;
      };

      object[method] = newMethod as unknown as T[keyof T];
    }
  });
}
