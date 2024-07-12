import { IEditField } from "../types/appdata";
import * as Yup from "yup";
export const createSchema = (allFields: IEditField[]) => {
  return allFields.reduce<Record<string, Yup.AnySchema>>((schema, field) => {
    let validator = getValidator(field.type);

    if (field.required) {
      const message = field.requiredText || "This field is required";

      // Apply specific validations based on the field type
      switch (field.type) {
        case "array":
          // Safely use `min()` only for arrays
          validator = (validator as Yup.ArraySchema<any, any>).min(1, message);
          break;
        case "select":
          // Safely use `min()` only for arrays
          validator = (validator as Yup.ArraySchema<any, any>).notOneOf(
            ["none"],
            message
          );
          break;
        default:
          validator = validator.required(message);
          break;
      }
    }

    schema[field.name] = validator;
    return schema;
  }, {});

  function getValidator(type: string) {
    switch (type) {
      case "number":
        return Yup.number();
      case "switch":
        return Yup.boolean();
      case "date":
        return Yup.date();
      case "array":
        return Yup.array();
      default:
        return Yup.string();
    }
  }
};
