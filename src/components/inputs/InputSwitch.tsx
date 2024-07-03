import { useState } from "react";
import { Controller, useFormContext } from "react-hook-form";
import { Switch } from "@mui/material";
import InputLabel from "./InputLabel";

const isFormInvalid = (err: any) => {
  if (Object.keys(err).length > 0) return true;
  return false;
};
export const InputSwitch = ({
  name,
  label,
  placeholder,

  disabled,
  helperText,
  required,
  control,
}: {
  name: string;
  label?: string;
  placeholder?: string;
  disabled?: boolean;
  helperText?: string;
  required?: boolean;

  control: any;
}) => {
  const {
    formState: { errors },
  } = useFormContext();

  const inputErrors = findInputError(errors, name);
  const isInvalid = isFormInvalid(inputErrors);
  const [isFocused, setIsFocused] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div className="input-container">
      {label && (
        <InputLabel
          label={label}
          options={{
            isInvalid,
            disabled,
            isFocused,
            isHovered,
            required,
          }}
        />
      )}
      <div className="inputBox">
        <Controller
          name={name}
          control={control}
          render={({ field, fieldState: { error } }) => {
            return (
              <Switch
                checked={field.value}
                onChange={field.onChange}
                name={field.name}
                disabled={disabled}
                onFocus={() => setIsFocused(true)}
                onBlur={() => setIsFocused(false)}
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
              />
            );
          }}
        />

        {helperText && !isInvalid && (
          <span
            className="body-xs-regular colorGrey600"
            style={{ lineHeight: "12px" }}
          >
            {helperText}
          </span>
        )}

        {isInvalid && (
          <span
            className="body-xs-regular colorSystemError"
            style={{ lineHeight: "12px" }}
          >
            {inputErrors?.error?.message}
          </span>
        )}
      </div>
    </div>
  );
};

function findInputError(errors: any, name: string) {
  const filtered: any = Object.keys(errors)
    .filter((key) => key.includes(name))
    .reduce((cur, key) => {
      return Object.assign(cur, { error: errors[key] });
    }, {});
  return filtered;
}
