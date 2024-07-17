import React, { useContext, useEffect, useState } from "react";
import styles from "./GroupCompanies.module.css";
import Breadcrumbs from "../breadcrumbs/Breadcrumbs";

import { IGroupCompanies } from "../../types/groupCompanies";
import { INIT_PAGINATE } from "../../constants/constants";
import { servicesPackage } from "../../services/servicesPackage";
import SearchInput from "../listItems/components/searchInput/SearchInput";
import { GlobalStateContext } from "../../context/GlobalStateProvider";
import { IEditField, IOptionsListItem } from "../../types/appdata";
import { Icon_add } from "../listItems/Icons";
import Tabs from "../tabs/Tabs";
import Companies from "../companies/Companies";
import SearchInputSimple from "../listItems/components/searchInput/SearchInputSimple";
import { Outlet, useLocation } from "react-router-dom";
import Createmodal from "../appmodal/Createmodal";
import ListsItemsInTab from "../listItemsInTab/ListItemsInTab";
import { createAnyEntity } from "../../utils";

const GroupCompany = ({
  initDataGroupCompanies,
  initDataCompany,
  initDataGroupAdmins,
  initDataGroupSettings,
}: {
  initDataGroupCompanies: IOptionsListItem;
  initDataCompany: IOptionsListItem;
  initDataGroupAdmins: IOptionsListItem;
  initDataGroupSettings: IOptionsListItem;
}) => {
  const location = useLocation();
  const groupId = location.pathname.split("/")[2];
  // Проверяем, содержит ли текущий путь вложенный маршрут (проверяем наличие второго сегмента после /group/:id)
  const isChildRoute = location.pathname.split("/").length > 3;
  //console.log(isChildRoute);
  // this const use for disabled interaction with page when data is loading in the tabs
  const [loading, setLoading] = useState<boolean>(false);
  const [searchState, setSearchState] = useState<string>("");

  const { title } = initDataGroupCompanies;

  // this is data for tabs
  const {
    forList: forListCompanies,
    title: titleCompanies,
    forEdit: forEditCompany,
  } = initDataCompany;
  const {
    forList: forListAdmins,
    title: titleAdmins,
    forEdit: forEditAdmin,
  } = initDataGroupAdmins;
  const {
    forList: forListSettings,
    title: titleSettings,
    forEdit: forEditSettings,
  } = initDataGroupSettings;

  const {
    searchBlock: placeholderSearchCompanies,
    buttonBlock: buttonBlockCompanies,
  } = forListCompanies;
  const {
    searchBlock: placeholderSearchAdmins,
    buttonBlock: buttonBlockAdmins,
  } = forListAdmins;
  const {
    searchBlock: placeholderSearchSettings,
    buttonBlock: buttonBlockSettings,
  } = forListSettings;

  const [modalCreateOpen, setModalCreateOpen] = useState(false);
  const [forEditData, setForEditData] = useState<any>(forEditCompany);
  const [allFields, setAllFields] = useState<IEditField[]>(
    forEditCompany.sections.reduce((acc: any, section: any) => {
      acc = [...acc, ...section.fields];
      return acc;
    }, [])
  );

  const [tab, setTab] = useState<number>(0);
  const [placeholder, setPlaceholder] = useState<string>(
    placeholderSearchCompanies || "Search ..."
  );
  const [buttonBlock, setButtonBlock] = useState<any>(buttonBlockCompanies);

  const groupService = servicesPackage["groupCompanies"];

  const changeRouteData = useContext(GlobalStateContext).changeRouteData;

  const createData = async (data: any) => {
    const tabServiceName =
      tab === 0 ? "company" : tab === 1 ? "groupAdmins" : "groupSettings";
    // here we add new item to the list from the active tab and add gorupId bs all items linked to group
    const tabService = servicesPackage[tabServiceName];
    const dataToSend = { ...data, groupId };
    await createAnyEntity(dataToSend, tabService);
  };

  useEffect(() => {
    changeRouteData({ groupCompanies: null });
    if (groupService) {
      setLoading(true);
      groupService
        .getOne(groupId)
        .then((res) => {
          const groupCompanies: IGroupCompanies = res as IGroupCompanies;
          changeRouteData({ groupCompanies: groupCompanies });
          setLoading(false);
        })
        .catch((err) => {
          console.log(err);
          setLoading(false);
        });
    }
  }, []);

  // set data for tabs
  // for create new item component
  // for edit item component
  // for list items component
  // for search input component
  // for button block component

  useEffect(() => {
    switch (tab) {
      case 0:
        setAllFields(
          forEditCompany.sections.reduce((acc: any, section: any) => {
            acc = [...acc, ...section.fields];
            return acc;
          }, [])
        );
        setForEditData(forEditCompany);
        setPlaceholder(placeholderSearchCompanies || "Search ...");
        setButtonBlock(buttonBlockCompanies);

        break;
      case 1:
        setAllFields(
          forEditAdmin.sections.reduce((acc: any, section: any) => {
            acc = [...acc, ...section.fields];
            return acc;
          }, [])
        );
        setForEditData(forEditAdmin);
        setPlaceholder(placeholderSearchAdmins || "Search ...");
        setButtonBlock(buttonBlockAdmins);

        break;
      case 2:
        setAllFields(
          forEditSettings.sections.reduce((acc: any, section: any) => {
            acc = [...acc, ...section.fields];
            return acc;
          }, [])
        );
        setForEditData(forEditSettings);
        setPlaceholder(placeholderSearchSettings || "Search ...");
        setButtonBlock(buttonBlockSettings);

        break;
      default:
        break;
    }
  }, [tab]);

  return (
    <React.Fragment>
      {modalCreateOpen && (
        <Createmodal
          fields={allFields}
          dataForPage={forEditData}
          openModal={modalCreateOpen}
          handleCloseModal={() => setModalCreateOpen(false)}
          setOpenModal={setModalCreateOpen}
          handleAction={createData}
        />
      )}
      <Outlet />
      <div
        className={`${styles.container} ${
          isChildRoute ? styles.childRoute : ""
        }`}
      >
        <div className={styles.header}>
          <div className={styles.right}>
            <SearchInputSimple
              disabled={loading}
              setSearchState={setSearchState}
              placeholder={placeholder}
            />
            <button
              data-size="small"
              className="button primaryButton colorBackgroundDefault"
              onClick={() => {
                setModalCreateOpen(true);
              }}
              disabled={loading}
            >
              <Icon_add />
              <span className="body-m-medium">
                {buttonBlock?.title || "Create"}
              </span>
            </button>
          </div>
        </div>

        <Tabs
          tabs={[titleCompanies, titleAdmins, titleSettings]}
          setTab={setTab}
          tab={tab}
        />
        {/* only for reload purpose */}
        {tab === 0 && (
          <ListsItemsInTab
            initData={initDataCompany}
            searchState={searchState}
          />
        )}
        {tab === 1 && (
          <ListsItemsInTab
            initData={initDataGroupAdmins}
            searchState={searchState}
          />
        )}
        {tab === 2 && (
          <ListsItemsInTab
            initData={initDataGroupSettings}
            searchState={searchState}
          />
        )}
      </div>
    </React.Fragment>
  );
};

export default GroupCompany;
