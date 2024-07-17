import React, { useEffect, useRef, useState } from "react";
import { IOptionsListItem } from "../../types/appdata";
import styles from "./Environment.module.css";
import { IEnvirnoment } from "../../types/environment";
import { servicesPackage } from "../../services/servicesPackage";
import { createAnyEntity } from "../../utils";
import { get } from "http";
import { getEnvironmentData } from "worker_threads";
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
  const [envVariables, setEnvVariables] = useState<IEnvirnoment[]>(dumnData);
  const { title, collectionName } = initDataEnvironment;
  const itemsService = servicesPackage[collectionName];

  const createItem = async (d: IEnvirnoment) => {
    await createAnyEntity(d, itemsService);
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
          <EditEnvVar key={idx} idx={idx} item={envVar} />
        ))}
        <CreateEnvVar createItem={createItem} />
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

const EditEnvVar = ({ item, idx }: { item: IEnvirnoment; idx: number }) => {
  return (
    <>
      <div className={styles.tableCell}>
        <input type="text" value={item.key} />
      </div>
      <div className={styles.tableCell}>
        <input type="text" value={item.type} />
      </div>
      <div className={styles.tableCell}>
        <input type="text" value={item.placeholder} />
      </div>
      <div className={styles.tableCell}>
        <input type="text" value={item.description} />
      </div>
      <div className={styles.tableCell}>save</div>
    </>
  );
};
const CreateEnvVar = ({
  createItem,
}: {
  createItem: (d: IEnvirnoment) => void;
}) => {
  const item: IEnvirnoment = {
    id: "",
    key: "",
    value: "",
    type: "string",
    placeholder: "",
    description: "",
  };
  return (
    <>
      <div className={styles.tableCell}>
        <input type="text" value={item.key} />
      </div>
      <div className={styles.tableCell}>
        <input type="text" value={item.type} />
      </div>
      <div className={styles.tableCell}>
        <input type="text" value={item.placeholder} />
      </div>
      <div className={styles.tableCell}>
        <input type="text" value={item.description} />
      </div>
      <div className={styles.tableCell}>
        <button onClick={() => createItem(item)}>create</button>
      </div>
    </>
  );
};
