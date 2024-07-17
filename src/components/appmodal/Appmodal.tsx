import { Modal } from "@mui/material";

import { useContext, useState } from "react";
import styles from "./Appmodal.module.css";
//import { useReactState } from "src/hooks/useReactState";

import CloseButton from "../CloseButton/CloseButton";
import { GlobalStateContext } from "../../context/GlobalStateProvider";
interface IProps {
  openModal: boolean;
  handleCloseModal: () => void;
  modalTitle: string;
  setOpenModal: (val: boolean) => void;
  handleAction: () => void;
  confirm?: string;
  confirmSuggestion?: string;
  action?: string;
}
const Appmodal = ({
  openModal,
  handleCloseModal,
  modalTitle,
  setOpenModal,
  handleAction,
  confirm,
  confirmSuggestion,
  action,
}: IProps) => {
  const { darkMode } = useContext(GlobalStateContext);
  const [confirmText, setConfirmText] = useState("");
  const handleConfirm = () => {
    handleAction();
  };
  return (
    <div>
      <Modal
        open={openModal}
        onClose={handleCloseModal}
        BackdropProps={
          darkMode === "dark"
            ? { style: { backgroundColor: "rgb(255, 255, 255,0.15)" } }
            : {}
        }
      >
        <div className={styles.wrapper}>
          <div className={styles.header}>
            <span className={`${styles.headerTitle} headings-h2`}>
              Confirm {action ? action : "action"}
            </span>

            <CloseButton
              onClick={() => {
                setOpenModal(false);
              }}
            />
          </div>

          <div className={styles.content}>
            <div className={styles.textWrapper}>
              <span className="body-m-regular colorGreyBlack">
                {modalTitle}
              </span>
            </div>
            {confirm && (
              <>
                <div className={styles.textWrapper}>
                  <span className="body-m-medium colorGreyBlack">
                    {confirmSuggestion}
                  </span>
                </div>
                <div className={styles.textWrapper}>
                  <input
                    placeholder="Type confirmation word"
                    className="custom-input"
                    type="text"
                    onChange={(e) => {
                      setConfirmText(e.target.value);
                    }}
                  ></input>
                </div>
              </>
            )}
          </div>

          <div className={styles.footer}>
            <div className={styles.buttonWrapper}>
              <button
                className="button secondaryButton"
                onClick={(e: any) => setOpenModal(false)}
              >
                <span className="body-m-regular colorGreyBlack">Cancel</span>
              </button>
              <button
                className="button primaryButton"
                disabled={Boolean(confirm && confirm !== confirmText)}
                onClick={(e) => {
                  setOpenModal(false);
                  handleConfirm();
                }}
              >
                <span className="body-m-regular colorGreyWhite">Confirm</span>
              </button>
            </div>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default Appmodal;
