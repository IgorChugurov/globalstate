import React, { useContext, useEffect, useState } from "react";
import { IEditField, IOptionsListItem } from "../../types/appdata";
import { GlobalStateContext } from "../../context/GlobalStateProvider";
import { useLocation } from "react-router-dom";
import { servicesPackage } from "../../services/servicesPackage";
import { createAnyEntity } from "../../utils";
import Createmodal from "../appmodal/Createmodal";
import ListsItemsInTab from "../listItemsInTab/ListItemsInTab";
import Tabs from "../tabs/Tabs";
import { Icon_add } from "../icons/Icons";
import SearchInputSimple from "../listItems/components/searchInput/SearchInputSimple";
import styles from "./Settings.module.css";

const Settings = ({
  initDataAppAdmins,
}: {
  initDataAppAdmins: IOptionsListItem;
}) => {
  const {
    forList: forListAdmins,
    title: titleAdmins,
    forEdit: forEditAdmin,
  } = initDataAppAdmins;
  const {
    searchBlock: placeholderSearchAdmins,
    buttonBlock: buttonBlockAdmins,
  } = forListAdmins;

  const [modalCreateOpen, setModalCreateOpen] = useState(false);
  const [forEditData, setForEditData] = useState<any>(forEditAdmin);
  const [allFields, setAllFields] = useState<IEditField[]>(
    forEditAdmin.sections.reduce((acc: any, section: any) => {
      acc = [...acc, ...section.fields];
      return acc;
    }, [])
  );

  // this const use for disabled interaction with page when data is loading in the tabs
  const [loading, setLoading] = useState<boolean>(false);
  const [searchState, setSearchState] = useState<string>("");

  const [tab, setTab] = useState<number>(0);
  const [placeholder, setPlaceholder] = useState<string>(
    placeholderSearchAdmins || "Search ..."
  );
  const [buttonBlock, setButtonBlock] = useState<any>(buttonBlockAdmins);
  const changeRouteData = useContext(GlobalStateContext).changeRouteData;

  const createData = async (data: any) => {
    const tabServiceName = tab === 0 ? "appAdmins" : "";
    // here we add new item to the list from the active tab and add gorupId bs all items linked to group
    const tabService = servicesPackage[tabServiceName];
    const dataToSend = { ...data };
    await createAnyEntity(dataToSend, tabService);
  };

  useEffect(() => {}, []);
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
      <div className={`${styles.container} `}>
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

        <Tabs tabs={[titleAdmins, "Settings"]} setTab={setTab} tab={tab} />
        {/* only for reload purpose */}
        {tab === 0 && (
          <ListsItemsInTab
            initData={initDataAppAdmins}
            searchState={searchState}
          />
        )}
        {tab === 1 && <>tab2 setting</>}
      </div>
    </React.Fragment>
  );
};

export default Settings;
