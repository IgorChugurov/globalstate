//import moment from "moment";
import styles from "./Columns.module.css";

import { Dispatch, SetStateAction } from "react";
import { IColumnForDataGrud, IEntity } from "../../../../types/lists";
import { ApiService, IApiService } from "../../../../services/servicesPackage";
import ActionCell from "../actionCell/ActionCell";

//import ActionCell from "./ActionCell";
interface IItemInCell {
  _id: string;
  [key: string]: any;
}

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
  setModalCreateOpen: Dispatch<SetStateAction<boolean>>;
  setItems: Dispatch<SetStateAction<any[]>>;
  setCurrentItem: Dispatch<SetStateAction<any | null>>;
  onChange?: (data: any) => void;
  columnsForGrid: IColumnForDataGrud[];
  dataService: ApiService<IEntity>;
}) => {
  const openForEdit = (d: IItemInCell) => {
    const item = items.find((p) => p._id === d._id);
    if (item) {
      setCurrentItem(item);
      setModalCreateOpen(true);
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
  setModalCreateOpen: Dispatch<SetStateAction<boolean>>;
  setCurrentItem: Dispatch<SetStateAction<any | null>>;
  dataService: ApiService<IEntity>;
}) => {
  //console.log(column);
  const { field, headerName, width, options, type } = column;
  return {
    field: field,
    headerName: headerName,
    width: width,
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
              <span className="body-s-regular colorGreyBlack textWithEllipsis">
                {itemInRow[field]}
              </span>
            </div>
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
            <span className="body-s-regular colorGreyBlack textWithEllipsis">
              {itemInRow[field]}
            </span>
          )}
        </div>
      );
    },
  };
};
