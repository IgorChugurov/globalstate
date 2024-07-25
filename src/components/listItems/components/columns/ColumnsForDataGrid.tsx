//import moment from "moment";
import styles from "./Columns.module.css";

import { Dispatch, SetStateAction } from "react";
import { IEntity } from "../../../../types/lists";
import { ApiService, IApiService } from "../../../../services/servicesPackage";
import ActionCell from "../../../actionCell/ActionCell";
import { IColumnForDataGrud } from "../../../../types/appdata";
import { Link } from "react-router-dom";
import { GridColumnHeaderParams } from "@mui/x-data-grid";

//import ActionCell from "./ActionCell";
interface IItemInCell {
  _id: string;
  [key: string]: any;
}
// create an array of columns for the data grid.
// The array is created from the array of columnsForGrid
// the columnsForGrid is an array of IColumnForDataGrud
// the array of items is used to get the data for the cells
// the dataService is used to update the data
// the setModalCreateOpen is used to open the edit or create modal
// the setCurrentItem is used to set the current item for the selected row
// the onChange is used to update the data in the parent component
// the setItems is used to update the items in the parent component
// redirect to the edit page when the cell is clicked if the type is naigateToDetails in the column

export const columnsForDataGrid = ({
  setCurrentItem,
  items,
  setModalCreateOpen,
  setItems,
  onChange,
  columnsForGrid,
  dataService,
}: {
  items: IItemInCell[];
  setModalCreateOpen?: Dispatch<SetStateAction<boolean>>;
  setItems: Dispatch<SetStateAction<any[]>>;
  setCurrentItem?: Dispatch<SetStateAction<any | null>>;
  onChange?: (data: any) => void;
  columnsForGrid: IColumnForDataGrud[];
  dataService: ApiService<IEntity>;
}) => {
  const openForEdit = (d: IItemInCell) => {
    const item = items.find((p) => p._id === d._id);
    if (item) {
      if (setCurrentItem) {
        setCurrentItem(item);
      }
      if (setModalCreateOpen) {
        setModalCreateOpen(true);
      }
    }
  };
  const columns = columnsForGrid.map((column) => {
    return getColumn({
      column,
      items,
      openForEdit,
      setModalCreateOpen,
      setCurrentItem,
      dataService,
    });
  });
  return columns;
};
const getColumn = ({
  column,
  items,
  openForEdit,
  setModalCreateOpen,
  setCurrentItem,
  dataService,
}: {
  column: IColumnForDataGrud;
  items: IItemInCell[];
  openForEdit: (d: IItemInCell) => void;
  setModalCreateOpen?: Dispatch<SetStateAction<boolean>>;
  setCurrentItem?: Dispatch<SetStateAction<any | null>>;
  dataService: ApiService<IEntity>;
}) => {
  //console.log(column);
  const { field, headerName, width, options, type, flex } = column;

  const url = window.location.pathname;
  return {
    field: field,
    headerName: headerName,
    width: width,
    flex: flex,
    disableReorder: true,
    renderHeader: (params: GridColumnHeaderParams) => (
      <span className="text-secondary mono-s-medium">{headerName}</span>
    ),
    renderCell: (params: any) => {
      const itemInRow = params.row;
      return (
        <div className={styles.cellInner}>
          {type && type === "openEditPage" ? (
            <div
              className={styles.linkWrap}
              onClick={(e: React.MouseEvent<HTMLElement>) => {
                openForEdit(itemInRow);
              }}
            >
              <span className="body-m-regular text-default textWithEllipsis">
                {itemInRow[field]}
              </span>
            </div>
          ) : type && type === "naigateToDetails" ? (
            <span className="body-m-regular text-default textWithEllipsis">
              <Link className={styles.linkWrap} to={`${url}/${itemInRow._id}`}>
                {itemInRow[field]}{" "}
              </Link>
            </span>
          ) : type &&
            type === "actions" &&
            column.options &&
            column.options.actions ? (
            <ActionCell
              actions={column.options.actions}
              rowId={itemInRow._id}
              item={itemInRow}
              setEditModalOpen={setModalCreateOpen}
              setCurrentItem={setCurrentItem}
              dataService={dataService}
            />
          ) : (
            <span className="body-m-regular text-default textWithEllipsis">
              {itemInRow[field]}
            </span>
          )}
        </div>
      );
    },
  };
};
