import React, { Dispatch, SetStateAction, useContext, useState } from "react";

import { Modal } from "@mui/material";
import styles from "./CreateItem.module.css";
import CloseButton from "../CloseButton/CloseButton";

import { FormProvider, useForm } from "react-hook-form";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { IDataForEditPage, IEditField } from "../../types/lists";
import { InputText } from "../inputs/InputText";
import { InputSelect } from "../inputs/InputSelect";
import { InputSwitch } from "../inputs/InputSwitch";
import { InputRadio } from "../inputs/InputRadio";
import { createSchema } from "../../utils";
import { InputMultipleSelect } from "../inputs/InputMultipleSelect";
import { TextView } from "../inputs/TextView";
import { TextCopy } from "../inputs/TextCopy";
import { GlobalStateContext } from "../../context/GlobalStateProvider";
import { on } from "events";

interface IItem {
  _id: string;
  name: string;
  createdAtStr: string;
  [key: string]: any;
}

interface IProps {
  openModal: boolean;
  handleCloseModal: () => void;
  setOpenModal: Dispatch<SetStateAction<boolean>>;
  currentItem: IItem;
  dataForEditPage: IDataForEditPage;

  allFields: IEditField[];
  onSuccess: (data: any) => void;
}

const CreateItem = ({
  currentItem,
  openModal,
  handleCloseModal,
  setOpenModal,
  dataForEditPage,
  onSuccess,

  allFields,
}: IProps) => {
  const { sections: initSection, reloadEventTitle } =
    structuredClone(dataForEditPage);
  const sections = initSection.filter((sec) => {
    sec.fields = sec.fields.filter((field) => {
      if (currentItem._id) {
        return field.forEitPage === "yes";
      } else {
        return field.forNewPage === "yes";
      }
    });

    return Boolean(sec.fields.length);
  });

  const { darkMode, state } = useContext(GlobalStateContext);
  const [item, setItem] = useState<IItem>(currentItem);
  const [loading, setLoading] = useState(false);
  const resolverSchema = Yup.object().shape(createSchema(allFields));
  const methods = useForm({
    mode: "onTouched",
    resolver: yupResolver(resolverSchema),
    defaultValues: item,
  });
  const { control } = methods;

  const onSubmitUpload = methods.handleSubmit(async (data) => {
    setLoading(true);
    onSuccess(data);
  });

  return (
    <Modal
      open={openModal}
      onClose={handleCloseModal}
      BackdropProps={
        darkMode === "dark"
          ? { style: { backgroundColor: "rgb(255, 255, 255,0.15)" } }
          : {}
      }
    >
      <div className={styles.container}>
        {/* {loading && (
          <div className={styles.loadingBox}>
            <CircularProgress />
          </div>
        )} */}

        <div className={styles.header}>
          <CloseButton
            onClick={() => {
              setOpenModal(false);
            }}
          />

          <span
            className="headers-h3 colorGreyBlack"
            style={{
              flex: "1 0 0",
            }}
          >
            {!currentItem._id
              ? dataForEditPage.title[0]
              : dataForEditPage.title[1]}
          </span>
          {currentItem._id && (
            <button
              className="button primaryButton"
              onClick={onSubmitUpload}
              data-size="small"
            >
              <span className="body-m-medium colorGreyWhite">Save Changes</span>
            </button>
          )}
        </div>
        {currentItem._id && (
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "8px",
              width: "100%",
            }}
          >
            {/* <ImageForTypeFile
                  fileType={fileTypes.find((item) => item._id === fileType)?.name || ""}
                  item={currentItem}
                  onClick={() => {
                    setPreviewModalOpen(true);
                  }}
                  
                /> */}
            <div className={styles.imageContainer}>
              <div
                className={styles.imageBox}
                style={{
                  backgroundImage: `url(/assets/img/access.png) !important`,
                }}
              ></div>
            </div>

            <div className={styles.containerForRule}>
              {/* <AccessActionButton
                  item={currentItem}
                  setEditModalOpen={setOpenModal}
                /> */}
            </div>
          </div>
        )}

        <div id="modalUploadInfo" className={styles.info}>
          <span className={[styles.title, "colorBlack body-m-bold"].join(" ")}>
            {dataForEditPage.pageHeader}
          </span>

          <FormProvider {...methods}>
            <form
              onSubmit={(e) => e.preventDefault()}
              //onSubmit={methods.handleSubmit(onSubmit, onError)}
              noValidate
              autoComplete="new-password"
              style={{ width: "100%" }}
            >
              <div className={styles.fileDetails}>
                {currentItem && currentItem._id && <></>}

                {sections.map((section) => (
                  <div className={styles.box1} key={section.title}>
                    <div className={styles.boxtitle}>
                      <div className={styles.number_box}>
                        <span className="headers-h4 colorBlack"></span>
                      </div>
                      <span className="headers-h4 colorBlack">
                        {section.title}
                      </span>
                    </div>

                    {section.fields.map((field) => {
                      return (
                        <div className={styles.box_container} key={field.name}>
                          {field.type === "select" ? (
                            <InputSelect
                              {...field}
                              control={control}
                              options={
                                field.collection && state[field.collection]
                                  ? state[field.collection].list
                                  : []
                              }
                            />
                          ) : field.type === "switch" ? (
                            <InputSwitch {...field} control={control} />
                          ) : field.type === "radio" ? (
                            <InputRadio {...field} control={control} />
                          ) : field.type === "array" ? (
                            <InputMultipleSelect
                              {...field}
                              control={control}
                              options={
                                field.collection && state[field.collection]
                                  ? state[field.collection].list
                                  : []
                              }
                            />
                          ) : field.type === "view" ? (
                            <TextView
                              {...field}
                              value={currentItem[field.name]}
                            />
                          ) : field.type === "copy" ? (
                            <TextCopy
                              {...field}
                              value={currentItem[field.name]}
                            />
                          ) : (
                            <InputText {...field} />
                          )}
                        </div>
                      );
                    })}
                  </div>
                ))}
              </div>
            </form>
          </FormProvider>
        </div>
        {!Boolean(currentItem && currentItem._id) && (
          <div className={styles.button_container}>
            <button
              className="button secondaryButton"
              onClick={() => {
                setOpenModal(false);
              }}
            >
              <span className="body-m-medium colorGreyBlack">Cancel</span>
            </button>
            <button className="button primaryButton" onClick={onSubmitUpload}>
              <span className="body-m-medium colorGreyWhite">Create</span>
            </button>
          </div>
        )}
      </div>
    </Modal>
  );
};

export default CreateItem;
