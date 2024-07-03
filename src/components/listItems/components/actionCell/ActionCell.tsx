import {
  Dispatch,
  SetStateAction,
  useContext,
  useEffect,
  useState,
} from "react";
import {
  GridEventListener,
  useGridApiContext,
  useGridApiEventHandler,
} from "@mui/x-data-grid";
import { Box } from "@mui/material";
import moment from "moment";
import styles from "./ActionCell.module.css";
import React from "react";

import { IEntity } from "../../../../types/lists";
import { copyToClipBoardUtil } from "../../../../utils/copyToClipboard";
import { sendMessage, setError, setSuccess } from "../../../../utils";
import {
  Icon_autorenew,
  Icon_content_copy,
  Icon_delete_inlist,
  Icon_edit_inlist,
} from "../../Icons";
import Appmodal from "../../../appmodal/Appmodal";
import { ApiService } from "../../../../services/servicesPackage";

var timeoutIDA: any = {};
//https://codesandbox.io/p/sandbox/mui-datagrid-change-cell-props-on-row-hover-u8d2q8?file=%2Fdemo.tsx%3A51%2C52-51%2C69&fontsize=14&hidenavigation=1&theme=dark
const ActionCell: React.FC<{
  actions: any;
  rowId?: number | string;
  item: IEntity;
  setCurrentItem?: (d: any) => void;
  setEditModalOpen?: Dispatch<SetStateAction<boolean>>;
  dataService: ApiService<IEntity, false>;
}> = ({
  rowId,
  item,
  setCurrentItem,
  setEditModalOpen,
  dataService,
  actions,
}) => {
  console.log(item.title, actions);

  const [action, setAction] = useState("");
  const [modalTitle, setModalTitle] = useState("");
  const [openModal, setOpenModal] = useState(false);

  const handleActionItem = (action: string) => {
    setAction(action);
    const title =
      action === "deleting"
        ? `Are you sure you want to delete ${item.name}? Deleting this key will revoke access for any applications or services currently using it.`
        : `Are you sure you want to update ${item.name}? This will generate a new key and revoke the this one.`;

    setModalTitle(title);
    setOpenModal(true);
  };

  const copyToClipBoard = () => {
    const data = item.apiKey;
    copyToClipBoardUtil(data, "API-key was copied");
  };

  const handleAction = async () => {
    if (action === "deleting") {
      await deleteItem();
    } else if (action === "regenerating") {
      // await regenerateAPIKey();
    }
    setAction("");
  };
  const deleteItem = async () => {
    sendMessage("showParanga");
    try {
      await dataService.deleteOne(item._id);
      setSuccess("Asscess was deleted");
      if (setEditModalOpen) {
        setEditModalOpen(false);
      }
      if (setEditModalOpen) {
        setEditModalOpen(false);
      }
      if (setCurrentItem) {
        setCurrentItem(null);
      }
      reloadList();
    } catch (err: any) {
      console.log(err);
      setError(err.message || "an error occurred");
    } finally {
      sendMessage("hideParanga");
      setTimeout(() => {
        setSuccess("");
        setError("");
      }, 5000);
    }
  };
  // const regenerateAPIKey = async () => {
  //   try {
  //     await dataService.regenerateAPIKey(item._id);
  //     setSuccess("API-key was regenerated");
  //     reloadList();
  //   } catch (err: any) {
  //     console.log(err);
  //     setError(err.message || "an error occurred");
  //   } finally {
  //     setTimeout(() => {
  //       setSuccess("");
  //       setError("");
  //     }, 5000);
  //   }
  // };
  const reloadList = () => {
    const event = new CustomEvent("reloadAccessesList");
    window.dispatchEvent(event);
  };
  return (
    <>
      <div className={styles.iconContainer}>
        {setCurrentItem && setEditModalOpen && (
          <div
            className={styles.iconWrapper}
            onClick={(e: React.MouseEvent<HTMLElement>) => {
              if (item) {
                setCurrentItem(item);
                setEditModalOpen(true);
              }
            }}
          >
            <Icon_edit_inlist />
          </div>
        )}

        <div
          className={styles.iconWrapper}
          onClick={(event: React.MouseEvent<HTMLElement>) => {
            copyToClipBoard();
          }}
        >
          <Icon_content_copy />
        </div>
        <div
          className={styles.iconWrapper}
          onClick={(event: React.MouseEvent<HTMLElement>) => {
            handleActionItem("regenerating");
          }}
        >
          <Icon_autorenew />
        </div>

        <div
          className={styles.iconWrapper}
          onClick={(e: React.MouseEvent<HTMLElement>) => {
            handleActionItem("deleting");
          }}
        >
          <Icon_delete_inlist />
        </div>
      </div>

      {openModal && (
        <Appmodal
          openModal={openModal}
          handleCloseModal={() => setOpenModal(false)}
          setOpenModal={setOpenModal}
          modalTitle={modalTitle}
          confirm={action === "regenerating" ? "Regenerate" : "Delete"}
          confirmSuggestion={
            action === "regenerating"
              ? "To confirm, please type the word Regenerate"
              : "To confirm, please type the word Delete"
          }
          handleAction={handleAction}
          action={action === "regenerating" ? "access API key update" : action}
        />
      )}
    </>
  );
};
export default ActionCell;
