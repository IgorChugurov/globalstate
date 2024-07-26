import React, { useEffect, useReducer, useRef, useState } from "react";
import { IOptionsListItem } from "../../types/appdata";
import styles from "./Environment.module.css";

import { servicesPackage } from "../../services/servicesPackage";
import { createAnyEntity } from "../../utils";
import { get } from "http";
import { getEnvironmentData } from "worker_threads";
import { updateAnyEntity } from "../../utils/createUpdateDeleteAnyEntity";
import Tabs from "../tabs/Tabs";
import Environment from "./Environment";
const dumnData = [
  {
    id: "1",
    key: "key1",
    value: "value1",
    placeholder: "placehoder1",
    type: "string" as const,
    description: "description1",
  },
  {
    id: "2",
    key: "key2",
    value: "value2",
    type: "string" as const,
    placeholder: "placehoder2",
    description: "description2",
  },
  {
    id: "3",
    key: "key3",
    value: "value3",
    type: "boolean" as const,
    placeholder: "placehoder3",
    description: "description3",
  },
  {
    id: "4",
    key: "key4",
    value: "value4",
    type: "number" as const,
    placeholder: "placehoder4",
    description: "description4",
  },
  {
    id: "5",
    key: "key5",
    value: "value5",
    type: "string" as const,
    placeholder: "placehoder5",
    description: "description5",
  },
];
const Environments = ({
  initDataCompanyEnvironment,
  initDataGroupEnvironment,
}: {
  initDataCompanyEnvironment: IOptionsListItem;
  initDataGroupEnvironment: IOptionsListItem;
}) => {
  const titleCompanies = "For companies";
  const titleGroup = "For groups";
  const [tab, setTab] = useState<number>(0);
  return (
    <div className={styles.container}>
      <Tabs tabs={[titleCompanies, titleGroup]} setTab={setTab} tab={tab} />
      {/* only for reload purpose */}
      {tab === 0 && (
        <Environment initDataEnvironment={initDataCompanyEnvironment} />
      )}
      {tab === 1 && (
        <Environment initDataEnvironment={initDataGroupEnvironment} />
      )}
    </div>
  );
};

export default Environments;
