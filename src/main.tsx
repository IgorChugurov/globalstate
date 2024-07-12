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

import "./index.css";
// here you can add your own css files like this files with styles and classes
// import "../css/index.css";
// import "../css/typography.css";
// import "../css/colors.css";
// import "../css/inputs.css";
// import "../css/menu.css";
// import "../css/buttons.css";
// import "../css/modal.css";
// and orevrite global styles , colors, typography, inputs, menu, buttons, modal and ect
import initConfig from "./appdata.json";

import NavbarApp from "./components/navbar/NavbarApp.tsx";
import GroupsCompanies from "./components/groupsCompanies/GroupsCompanies.tsx";
import GroupCompanies from "./components/groupCompanies/GroupCompanies.tsx";
import { IOptionsListItem } from "./types/appdata.ts";
import Company from "./components/Company/Company.tsx";
export const LSPrefix = initConfig.LSPrefix;

const EntitiesForListAndServicesPackageAndEditPage =
  initConfig.EntitiesForListAndServicesPackageAndEditPage;

const routers = EntitiesForListAndServicesPackageAndEditPage.filter((d) => {
  return d.collectionName !== "groupCompanies";
}).map((d) => ({
  path: `/${d.collectionName}`,
  element: (
    <div className="mainCootainer">
      <Navbar />
      <ListItems options={d as IOptionsListItem} />
    </div>
  ),
}));

const initDataGroupCompanies =
  EntitiesForListAndServicesPackageAndEditPage.find(
    (d) => d.collectionName === "groupCompanies"
  ) as IOptionsListItem;

const initDataCompany = EntitiesForListAndServicesPackageAndEditPage.find(
  (d) => d.collectionName === "company"
) as IOptionsListItem;
const initDataGroupAdmins = EntitiesForListAndServicesPackageAndEditPage.find(
  (d) => d.collectionName === "groupAdmins"
) as IOptionsListItem;
const initDataGroupSettings = EntitiesForListAndServicesPackageAndEditPage.find(
  (d) => d.collectionName === "groupSettings"
) as IOptionsListItem;
const initDataCompanySettings =
  EntitiesForListAndServicesPackageAndEditPage.find(
    (d) => d.collectionName === "companySettings"
  ) as IOptionsListItem;
const initDataCompanyAdmins = EntitiesForListAndServicesPackageAndEditPage.find(
  (d) => d.collectionName === "companyAdmins"
) as IOptionsListItem;

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <div className="mainCootainer">
        <NavbarApp />
      </div>
    ),
  },
  {
    path: "/groups",
    element: (
      <div className="mainCootainer">
        <NavbarApp />
        <GroupsCompanies initDataGroupCompanies={initDataGroupCompanies} />
      </div>
    ),
    children: [
      {
        path: "/groups/:groupId",
        element: (
          <>
            {initDataGroupCompanies ? (
              <GroupCompanies
                initDataGroupCompanies={initDataGroupCompanies}
                initDataCompany={initDataCompany}
                initDataGroupAdmins={initDataGroupAdmins}
                initDataGroupSettings={initDataGroupSettings}
              />
            ) : null}
          </>
        ),
        children: [
          {
            path: "/groups/:groupId/:compqanyId",
            element: (
              <>
                <Company
                  initDataCompany={initDataCompany}
                  initDataCompanyAdmins={initDataCompanyAdmins}
                  initDataCompanySettings={initDataCompanySettings}
                />
              </>
            ),
          },
        ],
      },
    ],
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
