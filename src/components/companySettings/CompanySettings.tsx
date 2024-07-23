import React, { useContext, useEffect, useState } from "react";
import { IOptionsListItem } from "../../types/appdata";
import styles from "./CompanySettings.module.css";
import { ICompany } from "../../types/groupCompanies";
import { GlobalStateContext } from "../../context/GlobalStateProvider";
import { InputText } from "../inputs/InputText";
import { set } from "react-hook-form";
import { updateAnyEntity } from "../../utils/createUpdateDeleteAnyEntity";
import { servicesPackage } from "../../services/servicesPackage";

const CompanySettings = ({
  initSettingData,
  initDataCompany,
  company,
}: {
  initSettingData: IOptionsListItem;
  initDataCompany: IOptionsListItem;
  company: ICompany | null;
}) => {
  const { routeData } = useContext(GlobalStateContext);
  const { groupCompanies } = routeData;
  const { collectionName } = initDataCompany;
  //console.log(collectionName);
  const itemsService = servicesPackage[collectionName];
  //console.log(groupCompanies);
  const [name, setName] = useState<string>("");
  const saveData = () => {
    const d = { _id: company?._id, name };
    console.log(d);
    updateAnyEntity(d, itemsService);
  };
  useEffect(() => {
    setName(company?.name || "company name");
  }, [company]);
  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <span className="body-l-medium">Settings for Bamboo</span>
        <span className="body-m-regular text-secondary ">
          Manage your company group information and settings.
        </span>
      </div>
      <div className={styles.card}>
        <div className={styles.cardHeader}>
          <span className="body-l-medium">General</span>
          <button
            className="button primaryButton"
            data-size="small"
            disabled={Boolean(!name)}
            onClick={saveData}
          >
            save
          </button>
        </div>
        <div className={styles.cardBody}>
          <div className={styles.cardBodyTitle}>
            <span className="body-m-medium">
              {groupCompanies?.name || groupCompanies?.title}
            </span>
          </div>
          <input
            className="custom-input"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
      </div>
      <div className={styles.card}></div>
      <div className={styles.card}></div>
    </div>
  );
};

export default CompanySettings;
