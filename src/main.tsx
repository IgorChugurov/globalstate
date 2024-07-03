/**
 * main.ts
 *
 * The main entry point for the React application. It sets up the routing using
 * configuration from appdata.json. Routes are dynamically generated for each entity
 * listed under EntitiesForListAndServicesPackageAndEditPage, creating structured paths
 * that include listing and editing functionalities for each entity.
 */

import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import ListItems from "./components/listItems/ListItems";
import { createBrowserRouter } from "react-router-dom";
import Navbar from "./components/navbar/Navbar.tsx";

import initConfig from "./appdata.json";
import { IOptionsListItem } from "./types/lists.ts";
export const LSPrefix = initConfig.LSPrefix;
const EntitiesForListAndServicesPackageAndEditPage =
  initConfig.EntitiesForListAndServicesPackageAndEditPage;

const routers = EntitiesForListAndServicesPackageAndEditPage.map((d) => ({
  path: `/${d.collectionName}`,
  element: (
    <>
      <Navbar />
      <ListItems options={d as IOptionsListItem} />
    </>
  ),
}));

const router = createBrowserRouter([
  {
    path: "/",
    element: <div>home</div>,
  },
  ...routers,

  {
    path: "/*",
    element: <div>any</div>,
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <App router={router} initConfig={initConfig} />
);
