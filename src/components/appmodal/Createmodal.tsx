import { Modal } from "@mui/material";

import { useContext, useEffect, useState } from "react";
import styles from "./Appmodal.module.css";
//import { useReactState } from "src/hooks/useReactState";

import { FormProvider, useForm } from "react-hook-form";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

import CloseButton from "../CloseButton/CloseButton";
import { GlobalStateContext } from "../../context/GlobalStateProvider";
import { InputSelect } from "../inputs/InputSelect";
import { InputSwitch } from "../inputs/InputSwitch";
import { InputRadio } from "../inputs/InputRadio";
import { InputMultipleSelect } from "../inputs/InputMultipleSelect";
import { InputText } from "../inputs/InputText";
import { IDataForEditPage, IEditField } from "../../types/appdata";
import { createSchema, getItemForEdit } from "../../utils";
interface IProps {
  openModal: boolean;
  handleCloseModal: () => void;
  setOpenModal: (val: boolean) => void;
  handleAction: (data: any) => void;
  fields: IEditField[];
  dataForPage: IDataForEditPage;
}
// to use this component you neet to provide  array of fields
// for this collection from appdata.json file

const Createmodal = ({
  openModal,
  handleCloseModal,
  setOpenModal,
  handleAction,
  dataForPage,
  fields,
}: IProps) => {
  const modalTitle = dataForPage.title[0];
  const buttontext = dataForPage.buttonText?.create || "Create";
  //console.log(modalTitle, fields);
  const [item] = useState<any>(getItemForEdit(fields));
  const { darkMode, state, renewData } = useContext(GlobalStateContext);
  //console.log(state);

  const resolverSchema = Yup.object().shape(createSchema(fields));
  const methods = useForm({
    mode: "onTouched",
    resolver: yupResolver(resolverSchema),
    defaultValues: item,
  });
  const { control } = methods;

  const onSubmit = methods.handleSubmit(async (data) => {
    //console.log(data);
    setOpenModal(false);
    handleAction(data);
  });
  useEffect(() => {
    renewData("categories");
  }, []);
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
              {modalTitle}
            </span>

            <CloseButton
              onClick={() => {
                setOpenModal(false);
              }}
            />
          </div>

          <div className={styles.editContent}>
            <FormProvider {...methods}>
              <form
                onSubmit={(e) => e.preventDefault()}
                //onSubmit={methods.handleSubmit(onSubmit, onError)}
                noValidate
                autoComplete="new-password"
                className={styles.form}
              >
                {fields.map((field) => {
                  return (
                    <div className={styles.editBlock} key={field.name}>
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
                      ) : (
                        <InputText {...field} />
                      )}
                    </div>
                  );
                })}
              </form>
            </FormProvider>
          </div>

          <div className={styles.footer}>
            <div className={styles.buttonWrapper}>
              <button
                className="button secondaryButton"
                onClick={(e: any) => setOpenModal(false)}
              >
                <span className="body-m-regular colorGreyBlack">Cancel</span>
              </button>
              <button onClick={onSubmit} className="button primaryButton">
                <span className="body-m-regular colorGreyWhite">
                  {buttontext}
                </span>
              </button>
            </div>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default Createmodal;
