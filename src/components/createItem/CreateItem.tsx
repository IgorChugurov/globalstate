import React, {
  Dispatch,
  SetStateAction,
  useContext,
  useEffect,
  useState,
} from "react";

import { Modal } from "@mui/material";
import styles from "./CreateItem.module.css";

import { FormProvider, set, useForm } from "react-hook-form";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

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
import { Icon_info, Icon_window_close } from "./Icons";
import { IDataForEditPage, IEditField } from "../../types/appdata";

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
  const [buttonTitle, setButtonTitle] = useState("Create");
  const {
    sections: initSection,
    reloadEventTitle,
    buttonText,
  } = structuredClone(dataForEditPage);
  const sections = initSection.filter((sec) => {
    sec.fields = sec.fields.filter((field) => {
      if (currentItem._id) {
        return field.forEitPage === "yes";
      } else {
        return field.forNewPage === "yes";
      }
    });

    return Boolean(sec.fields.length || sec.button);
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
  useEffect(() => {
    if (currentItem.id) {
      setButtonTitle(buttonText?.update || "Update");
    } else {
      setButtonTitle(buttonText?.create || "Create");
    }
  }, [currentItem]);

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
        <div className={styles.header}>
          <button
            data-size="small"
            className="iconButton secondatyIconButton"
            onClick={() => {
              setOpenModal(false);
            }}
          >
            <Icon_window_close />
          </button>

          <span
            className="body-l-medium"
            style={{
              flex: "1 0 0",
            }}
          >
            {!currentItem.id
              ? dataForEditPage.title[0]
              : dataForEditPage.title[1]}
          </span>

          <button
            className="button primaryButton"
            onClick={onSubmitUpload}
            data-size="small"
          >
            <span className="body-m-medium colorGreyWhite">{buttonTitle}</span>
          </button>
        </div>

        <FormProvider {...methods}>
          <form
            onSubmit={(e) => e.preventDefault()}
            //onSubmit={methods.handleSubmit(onSubmit, onError)}
            noValidate
            autoComplete="new-password"
            className={styles.form}
          >
            {sections.map((section, i) => (
              <div
                className={`${styles.section} ${
                  i !== 0 ? styles.borderTop : ""
                }`}
                key={section.title}
              >
                <div className={styles.boxtitle}>
                  <div className={styles.number_box}></div>
                  <span className="mono-s-medium">{section.title}</span>
                </div>
                {section.info && (
                  <div className={styles.info_section_container}>
                    <div className={styles.titleInfoContainerWrapper}>
                      <div className={styles.info_containerIconWrapper}>
                        <Icon_info />
                      </div>
                      <span className="body-m-medium">
                        {section.info.title}
                      </span>
                    </div>
                    <div className={styles.info_textWrapper}>
                      <span className="body-s-multiline">
                        {section.info.text}
                      </span>
                    </div>
                  </div>
                )}
                {section.button && (
                  <>
                    {section.button.action === "delete" && (
                      <button
                        className="button dangerButton"
                        onClick={() => {}}
                      >
                        {section.button.title}
                      </button>
                    )}
                  </>
                )}

                {section.fields.map((field) => {
                  return (
                    <div className={`${styles.box_container}`} key={field.name}>
                      {field.type === "select" ? (
                        <InputSelect
                          {...field}
                          control={control}
                          options={
                            field.options
                              ? field.options
                              : field.collection && state[field.collection]
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
                        <TextView {...field} value={currentItem[field.name]} />
                      ) : field.type === "copy" ? (
                        <TextCopy {...field} value={currentItem[field.name]} />
                      ) : (
                        <InputText {...field} />
                      )}
                    </div>
                  );
                })}
              </div>
            ))}
          </form>
        </FormProvider>

        {/* {!Boolean(currentItem && currentItem._id) && (
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
        )} */}
      </div>
    </Modal>
  );
};

export default CreateItem;
