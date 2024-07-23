import { Dispatch, SetStateAction, useState } from "react";

import styles from "./ActionCell.module.css";
import React from "react";

import { IEntity } from "../../types/lists";
import { copyToClipBoardUtil } from "../../utils/copyToClipboard";
import { sendMessage, setError, setSuccess } from "../../utils";

import Appmodal from "../appmodal/Appmodal";
import { ApiService } from "../../services/servicesPackage";
import { Icon_delete_inlist, Icon_setting_inlist } from "./Icons";
import { Link } from "react-router-dom";

const ActionCell: React.FC<{
  actions: any[];
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
  actions = [],
}) => {
  const url = window.location.pathname;
  const [action, setAction] = useState("");
  const [modalTitle, setModalTitle] = useState("");
  const [openModal, setOpenModal] = useState(false);

  const handleActionItem = (action: string) => {
    setAction(action);
    const title =
      action === "deleting"
        ? `Are you sure you want to delete ${item.name}?`
        : `Are you sure you want to update ${item.name}?`;

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
  const deleteItem = async () => {};

  return (
    <>
      <div className={styles.iconContainer}>
        {actions.map((action, i) => (
          <React.Fragment key={i}>
            {action.name === "edit" && (
              <>
                {action.link ? (
                  <Link to={`${url}/${rowId}`}>
                    <button
                      data-size="small"
                      className="iconButton tertiaryIconButton"
                    >
                      <Icon_setting_inlist />
                    </button>
                  </Link>
                ) : setCurrentItem && setEditModalOpen ? (
                  <button
                    data-size="small"
                    className="iconButton tertiaryIconButton"
                    onClick={(e: React.MouseEvent<HTMLElement>) => {
                      if (item) {
                        setCurrentItem(item);
                        setEditModalOpen(true);
                      }
                    }}
                  >
                    <Icon_setting_inlist />
                  </button>
                ) : (
                  <></>
                )}
              </>
            )}

            {action.name === "delete" && (
              <div
                className={styles.iconWrapper}
                onClick={(e: React.MouseEvent<HTMLElement>) => {
                  handleActionItem("deleting");
                }}
              >
                <Icon_delete_inlist />
              </div>
            )}
          </React.Fragment>
        ))}
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
