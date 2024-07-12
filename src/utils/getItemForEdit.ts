import { IEditField } from "../types/appdata";

export const getItemForEdit = <T>(allFields: IEditField[], currentItem?: T) => {
  let data = allFields.reduce((acc: any, field: any) => {
    if (field.forNewPage === "yes") {
      acc[field.name] =
        field.type === "number"
          ? 0
          : field.type === "boolean"
          ? false
          : field.type === "select"
          ? "none"
          : field.type === "switch"
          ? true
          : field.type === "radio"
          ? field.options[0].value
          : field.type === "array"
          ? []
          : "";
    }
    return acc;
  }, {});
  if (currentItem) {
    const dataFromServer: any = {
      ...JSON.parse(JSON.stringify(currentItem)),
    };
    data = { ...data, ...dataFromServer };
  }
  return data;
};
