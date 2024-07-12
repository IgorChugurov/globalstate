import React, { useEffect, useState } from "react";
import { IOptionsListItem } from "../../types/appdata";
import CustomGrid from "../customGrid/CustomGrid";
import { INIT_PAGINATE } from "../../constants/constants";
import { columnsForDataGrid } from "../listItems/components/columns/ColumnsForDataGrid";
import { ICompany } from "../../types/groupCompanies";
import { servicesPackage } from "../../services/servicesPackage";
import { IPaginate } from "../../types/request";

const ListsItemsInTab = ({
  initData,
  searchState,
}: {
  initData: IOptionsListItem;
  searchState: string;
}) => {
  const [modalCreateOpen, setModalCreateOpen] = useState(false);
  const [openConfirmModal, setOpenConfirmModal] = useState(false);

  const { forList, title, collectionName } = initData;

  const { searchBlock: placeholder, buttonBlock, columnsForGrid } = forList;
  //console.log(initData);

  const itemsService = servicesPackage[collectionName];
  const [items, setItems] = useState<ICompany[]>([]);
  const [currentItem, setCurrentItem] = useState<ICompany | null>(null);
  const [rowSelectionModel, setRowSelectionModel] = useState<string[]>([]);
  const [columns, setColumns] = useState<any[]>([]);
  const [paginate, setPaginate] = useState<IPaginate>({
    ...INIT_PAGINATE,
    search: searchState,
  });
  const handlePaginationModelChange = (data: {
    page: number;
    pageSize: number;
  }) => {
    setPaginate((prev: any) => ({
      ...prev,
      currentPage: data.page + 1,
      perPage: data.pageSize,
      loaded: false,
    }));
  };

  useEffect(() => {
    if (!paginate.loaded && itemsService && itemsService.getMany) {
      itemsService
        .getMany(paginate)
        .then((res: any) => {
          const data = res.items || res["products"];

          setItems(
            data.map((d: any) => ({
              ...d,
              id: d.id ? d.id : d._id,
              _id: d._id ? d._id : d.id,
            }))
          );
          const totalItems = res.totalItems || res.total;
          const totalPages = Math.ceil(totalItems / paginate.perPage);

          setPaginate((prev) => ({
            ...prev,
            currentPage: paginate.currentPage,
            perPage: paginate.perPage,
            totalItems: totalItems,
            totalPages: totalPages,
            loaded: true,
          }));
        })
        .catch((err: any) => {
          console.log(err);
        })
        .finally(() => {
          //setLoading(false);
        });
    }
  }, [paginate]);

  useEffect(() => {
    if (!paginate.search && !searchState) {
      return;
    }
    const tempPagination = Object.assign({}, paginate);
    tempPagination.search = searchState;
    if (!tempPagination.search) {
      delete tempPagination?.search;
    }
    tempPagination.loaded = false;
    tempPagination.currentPage = 1;
    setPaginate(tempPagination);
  }, [searchState]);

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
    <CustomGrid
      rowSelectionModel={rowSelectionModel}
      setRowSelectionModel={setRowSelectionModel}
      handlePaginationModelChange={handlePaginationModelChange}
      items={items}
      paginate={paginate}
      columns={columns}
    />
  );
};

export default ListsItemsInTab;
