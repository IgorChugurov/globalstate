import React, { useContext, useEffect, useState } from "react";
import styles from "./Company.module.css";
import Breadcrumbs from "../breadcrumbs/Breadcrumbs";
import { servicesPackage } from "../../services/servicesPackage";
import { useLocation } from "react-router-dom";
import { IEditField, IOptionsListItem } from "../../types/appdata";
import SearchInputSimple from "../listItems/components/searchInput/SearchInputSimple";
import { ICompany } from "../../types/groupCompanies";
import { Icon_add } from "../listItems/Icons";
import Tabs from "../tabs/Tabs";
import CompanyAdmmins from "../companyAdmins/CompanyAdmins";
import ListsItemsInTab from "../listItemsInTab/ListItemsInTab";
import Createmodal from "../appmodal/Createmodal";
import { GlobalStateContext } from "../../context/GlobalStateProvider";
import CompanySettings from "../companySettings/CompanySettings";
import { createAnyEntity } from "../../utils";

const Company = ({
  initDataCompany,
  initDataCompanyAdmins,
  initDataCompanySettings,
}: {
  initDataCompany: IOptionsListItem;
  initDataCompanyAdmins: IOptionsListItem;
  initDataCompanySettings: IOptionsListItem;
}) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [searchState, setSearchState] = useState<string>("");

  const { forList, title } = initDataCompany;
  const { afterCreate: afterCreateMessage } = forList.messages || {};
  const {
    forList: forListAdmins,
    title: titleAdmins,
    forEdit: forEditAdmins,
  } = initDataCompanyAdmins;
  const {
    forList: forListSettings,
    title: titleSettings,
    forEdit: forEditSettings,
  } = initDataCompanySettings;

  const {
    searchBlock: placeholderSearchAdmins,
    buttonBlock: buttonBlockAdmins,
  } = forListAdmins;
  const {
    searchBlock: placeholderSearchSettings,
    buttonBlock: buttonBlockSettings,
  } = forListSettings;

  const [modalCreateOpen, setModalCreateOpen] = useState(false);
  const [forEditData, setForEditData] = useState<any>(forEditAdmins);
  const [allFields, setAllFields] = useState<IEditField[]>(
    forEditAdmins.sections.reduce((acc: any, section: any) => {
      acc = [...acc, ...section.fields];
      return acc;
    }, [])
  );
  const [item, setItem] = useState<ICompany | null>(null);

  const [tab, setTab] = useState<number>(0);
  const [placeholder, setPlaceholder] = useState<string>(
    placeholderSearchAdmins || "Search ..."
  );
  const [buttonBlock, setButtonBlock] = useState<any>(buttonBlockAdmins);

  const itemsService = servicesPackage["company"];

  const location = useLocation();
  const changeRouteData = useContext(GlobalStateContext).changeRouteData;

  const createData = (data: any) => {
    createAnyEntity(data, itemsService, afterCreateMessage);
  };
  useEffect(() => {
    changeRouteData({ company: null });
    if (itemsService) {
      setLoading(true);
      itemsService.getOne(location.pathname.split("/")[2]).then((res) => {
        const company: ICompany = res as ICompany;
        setLoading(false);
        changeRouteData({ company: company });
        setItem(company);
      });
    }
  }, []);
  useEffect(() => {
    switch (tab) {
      case 1:
        setAllFields(
          forEditAdmins.sections.reduce((acc: any, section: any) => {
            acc = [...acc, ...section.fields];
            return acc;
          }, [])
        );
        setForEditData(forEditAdmins);
        setPlaceholder(placeholderSearchAdmins || "Search ...");
        setButtonBlock(buttonBlockAdmins);
        break;
      case 0:
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
      <div className={styles.container}>
        <Tabs tabs={[titleSettings, titleAdmins]} setTab={setTab} tab={tab} />
        {tab === 0 && (
          <CompanySettings
            initSettingData={initDataCompanySettings}
            company={item}
            initDataCompany={initDataCompany}
          />
        )}
        {tab === 1 && (
          <>
            <div className={styles.header}>
              <SearchInputSimple
                disabled={loading}
                setSearchState={setSearchState}
                placeholder={placeholder || "Search ..."}
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
                <span className="body-m-medium">{buttonBlock?.title}</span>
              </button>
            </div>
            <ListsItemsInTab
              initData={initDataCompanyAdmins}
              searchState={searchState}
            />
          </>
        )}
      </div>
    </React.Fragment>
  );
};

export default Company;
