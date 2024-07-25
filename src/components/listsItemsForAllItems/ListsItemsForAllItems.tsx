import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import { IOptionsListItem } from "../../types/appdata";
import CustomGrid from "../customGrid/CustomGrid";
import { INIT_PAGINATE } from "../../constants/constants";
import { columnsForDataGrid } from "../listItems/components/columns/ColumnsForDataGrid";
import { ICompany } from "../../types/groupCompanies";
import { servicesPackage } from "../../services/servicesPackage";
import { IPaginate } from "../../types/request";
import CustomGridAllItems from "../customGridAllItems/CustomGridAllItems";

const ListsItemsForAllItems = ({
  initData,
  searchState,
  setCurrentItem,
  setModalCreateOpen,
}: {
  initData: IOptionsListItem;
  searchState: string;
  setCurrentItem?: (d: any) => void;
  setModalCreateOpen?: Dispatch<SetStateAction<boolean>>;
}) => {
  const [openConfirmModal, setOpenConfirmModal] = useState(false);

  const { forList, title, collectionName, reloadEventTitle } = initData;

  const { columnsForGrid, forEmptyList } = forList;
  //console.log(initData);

  const itemsService = servicesPackage[collectionName];
  const [serverItems, setServerItems] = useState<ICompany[]>([]);
  const [items, setItems] = useState<ICompany[]>([]);

  const [rowSelectionModel, setRowSelectionModel] = useState<string[]>([]);
  const [columns, setColumns] = useState<any[]>([]);

  const [loading, setLoading] = useState<boolean>(false);
  const loadItems = () => {
    setLoading(true);
    itemsService
      .getAll()
      .then((res: any) => {
        const data = res.items || res["products"] || res["posts"] || [];
        setServerItems(
          data.map((d: any) => ({
            ...d,
            name: d.name || d.title || d.email || d.key,
            id: d.id ? d.id : d._id,
            _id: d._id ? d._id : d.id,
          }))
        );
      })
      .catch((err: any) => {
        console.log(err);
      })
      .finally(() => {
        setLoading(false);
        //setLoading(false);
      });
  };
  useEffect(() => {
    loadItems();
  }, []);

  useEffect(() => {
    setItems(serverItems.filter((item) => item.name.includes(searchState)));
  }, [serverItems, searchState]);

  useEffect(() => {
    // Add the event handler
    if (reloadEventTitle) {
      window.addEventListener(reloadEventTitle, loadItems);
    }
    // Remove the event handler
    return () => {
      if (reloadEventTitle) {
        window.removeEventListener(reloadEventTitle, loadItems);
      }
    };
  }, [reloadEventTitle]);

  useEffect(() => {
    setColumns(
      columnsForDataGrid({
        setCurrentItem,
        items,
        setItems,
        setModalCreateOpen,
        columnsForGrid,
        dataService: itemsService,
      })
    );
  }, []);

  return (
    <CustomGridAllItems
      items={items}
      columns={columns}
      forEmptyList={forEmptyList}
      loading={loading}
    />
  );
};

export default ListsItemsForAllItems;
