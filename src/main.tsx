import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import ListItems from "./components/listItems/ListItems";
import { createBrowserRouter } from "react-router-dom";
import Navbar from "./components/navbar/Navbar.tsx";

import initConfig from "./appdata.json";
export const LSPrefix = initConfig.LSPrefix;

const router = createBrowserRouter([
  {
    path: "/",
    element: <div>home</div>,
  },

  {
    path: "/products",

    element: (
      <>
        <Navbar />
        <ListItems entityName="products" />
      </>
    ),
  },
  {
    path: "/*",
    element: <div>any</div>,
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <App router={router} initConfig={initConfig} />
);
