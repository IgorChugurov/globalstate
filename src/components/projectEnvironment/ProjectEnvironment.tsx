import React, { useState } from "react";
import styles from "./ProjectEnvironment.module.css";
import { servicesPackage } from "../../services/servicesPackage";
import { IEditField, IOptionsListItem } from "../../types/appdata";
import SearchInputSimple from "../listItems/components/searchInput/SearchInputSimple";
import { Icon_add } from "../listItems/Icons";

import { createAnyEntity, getItemForEdit } from "../../utils";
import { IEnvironment } from "../../types/environment";
import ListsItemsForAllItems from "../listsItemsForAllItems/ListsItemsForAllItems";
import CreateItem from "../createItem/CreateItem";
import {
  deleteAnyEntity,
  updateAnyEntity,
} from "../../utils/createUpdateDeleteAnyEntity";

const ProjectEnvironment = ({
  initDataEnvironment,
}: {
  initDataEnvironment: IOptionsListItem;
}) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [searchState, setSearchState] = useState<string>("");
  const [currentItem, setCurrentItem] = useState<IEnvironment | null>(null);

  const { forList, forEdit, collectionName, title } = initDataEnvironment;
  const { afterCreate: afterCreateMessage } = forList.messages || {};
  const { searchBlock, buttonBlock } = forList;
  const [modalCreateOpen, setModalCreateOpen] = useState(false);
  const [allFields, setAllFields] = useState<IEditField[]>(
    forEdit.sections.reduce((acc: any, section: any) => {
      acc = [...acc, ...section.fields];
      return acc;
    }, [])
  );

  const [placeholder] = useState<string>(searchBlock || "Search ...");
  const itemsService = servicesPackage[collectionName];
  const createData = (data: any) => {
    createAnyEntity(data, itemsService, afterCreateMessage);
  };
  //console.log(currentItem, modalCreateOpen);

  //console.log(allFields);
  const createNewItem = () => {
    setCurrentItem(null);
    setModalCreateOpen(true);
  };

  const createOrUpdateData = (data: any) => {
    if (!currentItem) {
      createAnyEntity({ ...data }, itemsService, afterCreateMessage);
    } else {
      updateAnyEntity(data, itemsService, afterCreateMessage);
    }
  };
  const deleteItem = async () => {
    if (currentItem) {
      deleteAnyEntity(currentItem.id, itemsService);
    }
  };

  return (
    <React.Fragment>
      {modalCreateOpen && (
        <CreateItem
          allFields={allFields}
          dataForEditPage={forEdit}
          currentItem={getItemForEdit(allFields, currentItem)}
          openModal={modalCreateOpen}
          handleCloseModal={() => setModalCreateOpen(false)}
          setOpenModal={setModalCreateOpen}
          onSuccess={createOrUpdateData}
          onDelete={deleteItem}
        />
      )}
      <div className={styles.container}>
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
              createNewItem();
            }}
            disabled={loading}
          >
            <Icon_add />
            <span className="body-m-medium">{buttonBlock?.title}</span>
          </button>
        </div>
        <ListsItemsForAllItems
          initData={initDataEnvironment}
          searchState={searchState}
          setModalCreateOpen={setModalCreateOpen}
          setCurrentItem={setCurrentItem}
        />
      </div>
    </React.Fragment>
  );
};

export default ProjectEnvironment;
