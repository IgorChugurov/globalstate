import React, { useEffect, useReducer, useRef, useState } from "react";
import { IOptionsListItem } from "../../types/appdata";
import styles from "./Environment.module.css";

import { servicesPackage } from "../../services/servicesPackage";
import { createAnyEntity } from "../../utils";
import { get } from "http";
import { getEnvironmentData } from "worker_threads";
import { updateAnyEntity } from "../../utils/createUpdateDeleteAnyEntity";
import { IEnvironment } from "../../types/environment";
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
const Environment = ({
  initDataEnvironment,
}: {
  initDataEnvironment: IOptionsListItem;
}) => {
  const wrapper = useRef<HTMLDivElement | null>(null);
  const [envVariables, setEnvVariables] = useState<IEnvironment[]>(dumnData);
  const { title, collectionName } = initDataEnvironment;
  const itemsService = servicesPackage[collectionName];

  const createItem = async (d: IEnvironment) => {
    await createAnyEntity(d, itemsService);
    getEnvironmentData();
  };
  const updateItem = async (d: IEnvironment) => {
    await updateAnyEntity(d, itemsService);
    getEnvironmentData();
  };
  //todo get data from server and change getMany to getAll
  const getEnvironmentData = () => {
    itemsService.getMany().then((res) => {
      const d = {
        id: "6",
        key: "key6",
        value: "value6",
        type: "string" as const,
        placeholder: "placehoder6",
        description: "description6",
      };
      setEnvVariables([d, ...dumnData]);
      //   const data = res.post || [];
      //   setEnvVariables(
      //     data.map((d: any) => ({
      //       ...d,
      //       id: d.id ? d.id : d._id,
      //       _id: d._id ? d._id : d.id,
      //     }))
      //   );
    });
  };

  useEffect(() => {
    getEnvironmentData();
  }, []);
  return (
    <div className={styles.container} ref={wrapper}>
      <div className={styles.table}>
        <div className={styles.tableHeader}>Key</div>
        <div className={styles.tableHeader}>Value Type</div>
        <div className={styles.tableHeader}>Placeholder</div>
        <div className={styles.tableHeader}>description</div>
        <div className={styles.tableHeader}>action</div>

        {envVariables.map((envVar, idx) => (
          <div className={styles.tableRow} key={idx}>
            <EditEnvVar
              idx={idx}
              item={envVar}
              updateItem={updateItem}
              setEnvVariables={setEnvVariables}
            />
          </div>
        ))}
        <div className={styles.tableRow}>
          <CreateEnvVar createItem={createItem} />
        </div>
        {/* Create */}
        {/* {renewListValues && (
            <NewKeyValueRow
              options={options}
              renewListValues={renewListValues}
              onSubmit={onSubmit}
            />
          )}
          {renewListKeys && (
            <NewKeyRow
              options={options}
              renewListKeys={renewListKeys}
              onSubmit={onSubmit}
            />
          )} */}
      </div>
    </div>
  );
};

export default Environment;

const EditEnvVar = ({
  item,
  idx,
  updateItem,
  setEnvVariables,
}: {
  item: IEnvironment;
  idx: number;
  updateItem: (d: IEnvironment) => void;
  setEnvVariables: (d: IEnvironment[]) => void;
}) => {
  const [data, setData] = useReducer(
    (state: { [key: string]: any }, newState: { [key: string]: any }) => ({
      ...state,
      ...newState,
    }),
    item
  );
  const resetChanges = () => {
    setData(item);
  };

  return (
    <>
      <div className={styles.tableCell}>
        <input
          type="text"
          value={data.key}
          onChange={(e) => setData({ key: e.target.value })}
        />
      </div>
      <div className={styles.tableCell}>
        <input
          type="text"
          value={data.type}
          onChange={(e) => setData({ type: e.target.value })}
        />
      </div>
      <div className={styles.tableCell}>
        <input
          type="text"
          value={data.placeholder}
          onChange={(e) => setData({ placeholder: e.target.value })}
        />
      </div>
      <div className={styles.tableCell}>
        <input
          type="text"
          value={data.description}
          onChange={(e) => setData({ description: e.target.value })}
        />
      </div>
      <div className={styles.tableCell}>
        <button
          data-size="small"
          className="button primaryButton"
          onClick={() => updateItem(data as IEnvironment)}
        >
          save
        </button>
        <button
          data-size="small"
          className="button secondaryButton"
          onClick={() => resetChanges()}
        >
          reset
        </button>
      </div>
    </>
  );
};
const CreateEnvVar = ({
  createItem,
}: {
  createItem: (d: IEnvironment) => void;
}) => {
  const item: IEnvironment = {
    id: "",
    key: "",
    value: "",
    type: "string",
    placeholder: "",
    description: "",
  };
  const [data, setData] = useReducer(
    (state: { [key: string]: any }, newState: { [key: string]: any }) => ({
      ...state,
      ...newState,
    }),
    item
  );
  const resetChanges = () => {
    setData(item);
  };
  return (
    <>
      <div className={styles.tableCell}>
        <input
          type="text"
          value={data.key}
          onChange={(e) => setData({ key: e.target.value })}
        />
      </div>
      <div className={styles.tableCell}>
        <input
          type="text"
          value={data.type}
          onChange={(e) => setData({ type: e.target.value })}
        />
      </div>
      <div className={styles.tableCell}>
        <input
          type="text"
          value={data.placeholder}
          onChange={(e) => setData({ placeholder: e.target.value })}
        />
      </div>
      <div className={styles.tableCell}>
        <input
          type="text"
          value={data.description}
          onChange={(e) => setData({ description: e.target.value })}
        />
      </div>
      <div className={styles.tableCell}>
        <button
          data-size="small"
          className="button primaryButton"
          onClick={() => createItem(item)}
        >
          create
        </button>
        <button
          data-size="small"
          className="button secondaryButton"
          onClick={() => resetChanges()}
        >
          reset
        </button>
      </div>
    </>
  );
};
