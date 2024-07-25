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
import { IActionData } from "../../types/appdata";
import { deleteAnyEntity } from "../../utils/createUpdateDeleteAnyEntity";

const ActionCell: React.FC<{
  actions: IActionData[];
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
  const [action, setAction] = useState<IActionData | null>(null);
  const [modalTitle, setModalTitle] = useState("");
  const [modalText, setModalText] = useState("");
  const [openModal, setOpenModal] = useState(false);
  const [confirmText, setConfirmText] = useState("");
  const [confirmWord, setConfirmWord] = useState("");

  const handleActionItem = (action: IActionData) => {
    setAction(action);
    setConfirmText(action.confirmText || "");
    setConfirmWord(action.confirmWord || "");
    setModalTitle(action.modalTitle || `Confirm`);
    setModalText(
      action.modalText
        ? action.modalText.replace(
            "${item.name}",
            item.name || item.title || item.email
          )
        : "Are you sure you want to do this?"
    );
    setOpenModal(true);
  };

  // const copyToClipBoard = () => {
  //   const data = item.apiKey;
  //   copyToClipBoardUtil(data, "API-key was copied");
  // };

  const handleAction = async () => {
    if (action && action.name === "delete") {
      await deleteItem();
    }
    setAction(null);
  };
  const deleteItem = async () => {
    deleteAnyEntity(item._id, dataService);
  };

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
                      className="iconButton tertiaryIconButton bgTransparent"
                    >
                      <Icon_setting_inlist />
                    </button>
                  </Link>
                ) : setCurrentItem && setEditModalOpen ? (
                  <button
                    data-size="small"
                    className="iconButton tertiaryIconButton bgTransparent"
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
              <button
                data-size="small"
                className="iconButton tertiaryIconButton bgTransparent"
                onClick={(e: React.MouseEvent<HTMLElement>) => {
                  handleActionItem(action);
                }}
              >
                <Icon_delete_inlist />
              </button>
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
          confirmWord={confirmWord}
          confirmSuggestion={confirmText}
          handleAction={handleAction}
          modalText={modalText}
        />
      )}
    </>
  );
};
export default ActionCell;
