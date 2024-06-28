import React, { useContext, useEffect, useRef, useState } from "react";
import styles from "./listItems.module.css";
import "./customDataGrid.css";
import { GlobalStateContext } from "../../context/GlobalStateProvider";

import { useDebounce } from "../../hooks/debounce";
import { servicesPackage } from "../../services/servicesPackage";
import { DataGrid, GridCellParams, MuiEvent } from "@mui/x-data-grid";
import { INIT_PAGINATE } from "../../constants/constants";
import Appmodal from "../appmodal/Appmodal";

const ListItems = <
  ItemClass extends {
    _id?: string;
    id?: string;
    name: string;
    email?: string;
    index?: number;
    userId?: string;
  }
>({
  entityName,
}: {
  entityName: string;
}) => {
  //const { state, renewData } = useContext(GlobalStateContext);
  //console.log();
  const itemsService = servicesPackage[entityName];
  //   const renewDataCallback = useCallback(() => {
  //     renewData(entityName);
  //   }, [renewData, entityName]);

  useEffect(() => {
    //console.log("Current state:", state);
    //renewDataCallback();
  }, []);

  const inputSearchRef = useRef<HTMLInputElement>(null);
  const [modalCreateOpen, setModalCreateOpen] = useState(false);
  const [items, setItems] = useState<ItemClass[]>([]);
  const [currentItem, setCurrentItem] = useState<ItemClass | null>(null);
  const [rowSelectionModel, setRowSelectionModel] = useState<string[]>([]);
  const [allItems, setAllItems] = useState(false);

  const [fileType, setFileType] = useState("");
  const [openConfirmModal, setOpenConfirmModal] = useState(false);
  const [search, setSearch] = useState("");
  const debounced = useDebounce(search, 700);
  // const [loading, setLoading] = useState(true);
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
          const data = res.items || res[entityName];
          setItems(data);
          //   if (res.items) {
          //     setItems(
          //       res.items.map((d: any) => ({
          //         ...d,
          //       }))
          //     );
          //   } else if (res[entityName]) {
          //     setItems(
          //       res[entityName].map((d: any) => ({
          //         ...d,
          //       }))
          //     );
          //   }

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

  return (
    <>
      {openConfirmModal && (
        <Appmodal
          openModal={openConfirmModal}
          handleCloseModal={() => setOpenConfirmModal(false)}
          setOpenModal={setOpenConfirmModal}
          modalTitle={`Do you really want to delete `}
          handleAction={() => {}}
          action={"deleting"}
        />
      )}
      <div className={styles.container}>
        <div onClick={() => setOpenConfirmModal(true)}> click</div>
        <DataGrid
          className={"customDataGrid"}
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
          columns={[
            { field: "title" },
            { field: "brand" },
            { field: "category" },
          ]}
          //   columns={columns({
          //     setCurrentItem,
          //     fileTypes,
          //     groupedCompanies,
          //     items,
          //     levels,
          //     setItems,
          //     setModalCreateOpen,
          //     onChange: updateData,
          //   })}
          localeText={{ noRowsLabel: "No matching accesses found" }}
          //autoHeight={true}
        />
      </div>
    </>
  );
};

export default ListItems;
