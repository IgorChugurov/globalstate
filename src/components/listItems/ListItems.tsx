import React, { useCallback, useContext, useEffect, useState } from "react";
import styles from "./listItems.module.css";

import { GlobalStateContext } from "../../context/GlobalStateProvider";

import { servicesPackage } from "../../services/servicesPackage";
import {
  DataGrid,
  GridCellParams,
  GridColDef,
  MuiEvent,
} from "@mui/x-data-grid";
import { INIT_PAGINATE } from "../../constants/constants";
import Appmodal from "../appmodal/Appmodal";

import SearchBlock from "./components/searchBlock/SearchBlock";
import FiltersBlock from "./components/filtersBlock/FiltersBlock";
import { Icon_add } from "./Icons";
import CreateItem from "./components/createItem/CreateItem";
import { columnsForDataGrid } from "./components/columns/ColumnsForDataGrid";
import { getItemForEdit } from "../../utils";
import { IEditField, IOptionsListItem } from "../../types/appdata";

const ListItems = <
  ItemClass extends {
    _id: string;
    id?: string;
    name: string;
    email?: string;
    index?: number;
    userId?: string;
  }
>({
  options,
}: {
  options: IOptionsListItem;
}) => {
  const { state, renewData } = useContext(GlobalStateContext);
  const { collectionName, forEdit: dataForEditPage } = options;
  // get all fields from all sections for create item for new page or edit page
  // use getItemForEdit function for this
  const allFields: IEditField[] = dataForEditPage.sections.reduce(
    (acc: any, section: any) => {
      acc = [...acc, ...section.fields];
      return acc;
    },
    []
  );

  const { searchBlock, filters, buttonBlock, columnsForGrid } = options.forList;
  //console.log(columnsForGrid);

  const itemsService = servicesPackage[collectionName];
  const renewDataCallback = useCallback(() => {
    if (filters && filters.length) {
      filters.forEach((filter) => {
        if (
          state[filter.collection] &&
          state[filter.collection].list &&
          state[filter.collection].list.length === 0
        ) {
          renewData(filter.collection);
        }
      });
    }
  }, [renewData, filters]);

  useEffect(() => {
    renewDataCallback();
  }, []);

  const [modalCreateOpen, setModalCreateOpen] = useState(false);
  const [items, setItems] = useState<ItemClass[]>([]);
  const [currentItem, setCurrentItem] = useState<ItemClass | null>(null);
  const [rowSelectionModel, setRowSelectionModel] = useState<string[]>([]);
  const [allItems, setAllItems] = useState(false);

  const [openConfirmModal, setOpenConfirmModal] = useState(false);

  const [paginate, setPaginate] = useState(INIT_PAGINATE);

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
    if (!paginate.loaded && itemsService && itemsService.getAll) {
      itemsService
        .getAll(paginate)
        .then((res: any) => {
          const data = res.items || res[collectionName];
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
  const createNewItem = () => {
    setCurrentItem(null);
    setModalCreateOpen(true);
  };

  return (
    <>
      {openConfirmModal && (
        <Appmodal
          openModal={openConfirmModal}
          handleCloseModal={() => setOpenConfirmModal(false)}
          setOpenModal={setOpenConfirmModal}
          modalTitle={`Do you really want to delete ${
            allItems ? paginate.totalItems : rowSelectionModel.length
          } item${rowSelectionModel.length > 1 ? "s" : ""}?`}
          handleAction={() => {}}
          action={"deleting"}
        />
      )}
      {modalCreateOpen && (
        <CreateItem
          allFields={allFields}
          dataForEditPage={dataForEditPage}
          currentItem={getItemForEdit(allFields, currentItem)}
          openModal={modalCreateOpen}
          handleCloseModal={() => setModalCreateOpen(false)}
          setOpenModal={setModalCreateOpen}
          dataService={itemsService}
        />
      )}
      <div className={styles.container}>
        <div className={styles.header}>
          <div className={styles.searchBlockContainer}>
            {searchBlock ? (
              <SearchBlock
                placeholder={searchBlock}
                paginate={paginate}
                disabled={!Boolean(paginate.loaded)}
                setPaginate={setPaginate}
                rowSelectionModel={rowSelectionModel}
                setOpenConfirmModal={setOpenConfirmModal}
                setAllItems={setAllItems}
                allItems={allItems}
                items={items}
              />
            ) : (
              <div></div>
            )}
            {buttonBlock && (
              <button
                data-size="small"
                className="button primaryButton"
                onClick={createNewItem}
                disabled={!Boolean(paginate.loaded)}
              >
                <span className="body-m-medium colorGreyWhite">
                  {buttonBlock.title}
                </span>
                <Icon_add />
              </button>
            )}
          </div>
        </div>

        <FiltersBlock
          filters={filters}
          setPaginate={setPaginate}
          paginate={paginate}
        />
        {/* 
        <DataGrid
          className={"custom-data-grid"}
          onCellDoubleClick={(params, event) => {
            if (!event.ctrlKey) {
              event.defaultMuiPrevented = true;
            }
          }}
          onCellClick={(
            params: GridCellParams,
            event: MuiEvent<React.MouseEvent>
          ) => {
            event.defaultMuiPrevented = true;
          }}
          getRowHeight={() => "auto"}
          checkboxSelection
          disableRowSelectionOnClick
          disableColumnSelector
          disableColumnFilter
          loading={!paginate.loaded}
          pagination
          paginationMode="server"
          rowCount={paginate.totalItems}
          getRowId={(row: any) => row?._id || row?.id}
          pageSizeOptions={[5, 10, 25, 50, 100]}
          paginationModel={{
            page: paginate.currentPage ? paginate?.currentPage - 1 : 0,
            pageSize: paginate.perPage,
          }}
          onPaginationModelChange={handlePaginationModelChange}
          onRowSelectionModelChange={(itm: any) => {
            setRowSelectionModel(itm);
          }}
          rowSelectionModel={rowSelectionModel}
          rows={items}
          columns={
            columnsForDataGrid({
              setCurrentItem,
              items,
              setItems,
              setModalCreateOpen,
              columnsForGrid,
              dataService: itemsService,
            }) as readonly GridColDef<ItemClass>[]
          }
          localeText={{ noRowsLabel: "No matching accesses found" }}
        /> */}
      </div>
    </>
  );
};

export default ListItems;
