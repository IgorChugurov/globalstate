import { Controller, useFormContext } from "react-hook-form";
import { useState } from "react";
import InputLabel from "./InputLabel";

const isFormInvalid = (err: any) => {
  if (Object.keys(err).length > 0) return true;
  return false;
};

export const InputRadio = ({
  name,
  label,
  type,
  placeholder,
  options,
  disabled,
  helperText,
  required,
  control,
}: {
  name: string;
  label?: string;
  type?: string;
  placeholder?: string;
  options?: { label: string; value: any }[];
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
      <div
        style={{ display: "flex", flexDirection: "column", gap: "16px" }}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <Controller
          name={name}
          control={control}
          render={({ field }) => (
            <>
              {options &&
                options.map((option, index) => (
                  <label
                    key={index}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "8px",
                    }}
                  >
                    <input
                      type="radio"
                      value={option.value}
                      checked={field.value === option.value}
                      onChange={field.onChange}
                      disabled={disabled}
                      style={{ height: "20px", minWidth: "20px" }}
                    />
                    <span className="body-s-medium colorGreyBlack">
                      {option.label}
                    </span>
                  </label>
                ))}
            </>
          )}
        />
        {/* {options &&
          options.length > 0 &&
          options.map((option, index) => (
            <div key={index}>
              <label
                style={{ display: "flex", alignItems: "center", gap: "8px" }}
              >
                <input
                  //className="custom-input"
                  style={{ height: "20px", minWidth: "20px" }}
                  type="radio"
                  value={option.value}
                  disabled={disabled}
                  {...register(name)}
                  checked={Boolean(JSON.parse(fieldValue) === option.value)}
                />
                <span className="body-s-medium colorGreyBlack">
                  {option.name}
                </span>
              </label>
            </div>
          ))} */}
      </div>

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
