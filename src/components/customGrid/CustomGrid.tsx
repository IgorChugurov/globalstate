import { DataGrid, GridCellParams, MuiEvent } from "@mui/x-data-grid";
import React from "react";
import { IPaginate } from "../../types/request";

const CustomGrid = ({
  columns,
  paginate,
  items,
  handlePaginationModelChange,
  rowSelectionModel,
  setRowSelectionModel,
}: {
  items: any[];
  columns: any;
  paginate: IPaginate;
  handlePaginationModelChange: (d: any) => void;
  rowSelectionModel: string[];
  setRowSelectionModel: (d: any) => void;
}) => {
  return (
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
        columns
        // columnsForDataGrid({
        //   setCurrentItem,
        //   items,
        //   setItems,
        //   setModalCreateOpen,
        //   columnsForGrid,
        //   dataService: itemsService,
        // }) as readonly GridColDef<ItemClass>[]
      }
      localeText={{ noRowsLabel: "No matching accesses found" }}
      //autoHeight={true}
    />
  );
};

export default CustomGrid;
