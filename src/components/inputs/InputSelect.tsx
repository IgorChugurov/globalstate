import { useEffect, useRef, useState } from "react";
import { Controller, useFormContext } from "react-hook-form";
import { Box, MenuItem, Select } from "@mui/material";
import InputLabel from "./InputLabel";

const isFormInvalid = (err: any) => {
  if (Object.keys(err).length > 0) return true;
  return false;
};
export const InputSelect = <T,>({
  options,
  name,
  label,
  placeholder,
  IconFirstComponent,
  disabled,
  helperText,
  required,
  control,
}: {
  options: T[];
  name: string;
  label?: string;
  placeholder?: string;
  disabled?: boolean;
  helperText?: string;
  required?: boolean;
  IconFirstComponent?: any;
  control: any;
}) => {
  const {
    formState: { errors },
  } = useFormContext();

  const selectRef = useRef(null);
  const [anchorEl, setAnchorEl] = useState(null);
  const inputErrors = findInputError(errors, name);
  const isInvalid = isFormInvalid(inputErrors);
  const [isFocused, setIsFocused] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const [optioinsWithEmpty, setOptioinsWithEmpty] = useState<any[]>([]);
  useEffect(() => {
    if (options && options.length > 0) {
      const emptyOption = { id: "none", name: placeholder };
      setOptioinsWithEmpty([emptyOption, ...options]);
    }
  }, [options]);

  const handleMenuOpen = (event: any) => {
    setIsFocused(true);
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    setIsFocused(false);
  };

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
        {optioinsWithEmpty && optioinsWithEmpty.length > 0 && (
          <Controller
            name={name}
            defaultValue={"none"}
            control={control}
            render={({ field, fieldState: { error } }) => {
              return (
                <Box ref={selectRef} sx={{ width: "100%" }}>
                  <Select
                    data-error={isInvalid}
                    data-anchor={Boolean(anchorEl)}
                    data-disabled={disabled}
                    className={`custom_select ${disabled ? "disabled" : ""}`}
                    onMouseEnter={() => setIsHovered(true)}
                    onMouseLeave={() => setIsHovered(false)}
                    disabled={disabled}
                    {...field}
                    onOpen={handleMenuOpen}
                    onClose={handleMenuClose}
                    MenuProps={{
                      anchorEl: anchorEl,
                      open: Boolean(anchorEl),
                      onClose: handleMenuClose,
                      PaperProps: {
                        className: "menuPaper",
                        sx: { marginTop: "-7px", maxHeight: "300px" },
                      },
                    }}
                    renderValue={(selValue) => {
                      const selectedOption = optioinsWithEmpty.find(
                        (option) => option.id === selValue
                      );
                      return (
                        <div
                          style={{
                            display: "flex",
                            alignItems: "center",
                            gap: "8px",
                            alignSelf: "stretch",
                            // marginTop: "4px",
                          }}
                        >
                          {IconFirstComponent && (
                            <IconFirstComponent
                              type={selectedOption?.name || ""}
                              classN={disabled ? "colorGrey500" : ""}
                              iconColor={disabled ? "var(--Grey-500)" : ""}
                            />
                          )}

                          <span
                            className={`menuItemText body-s-regular ${
                              selectedOption.id !== "none"
                                ? "colorGreyBlack"
                                : "colorGrey600"
                            }`}
                          >
                            {selectedOption.name}
                          </span>
                        </div>
                      );
                    }}
                  >
                    {optioinsWithEmpty.map(
                      (
                        r: {
                          id: string;
                          name: string;
                        },
                        i
                      ) => (
                        <MenuItem
                          value={r.id}
                          key={r.id}
                          className="menuItem"
                          sx={{
                            display:
                              r.id === "none" ? "none !important" : "flex",
                            "&.MuiButtonBase-root.MuiMenuItem-root.Mui-focusVisible":
                              {
                                backgroundColor: "grey.white",
                              },
                            "&.Mui-selected": {
                              backgroundColor: "primary.100",
                            },
                          }}
                        >
                          {IconFirstComponent && (
                            <IconFirstComponent
                              type={r?.name || ""}
                              classN=""
                            />
                          )}
                          <span
                            className={[
                              "menuItemText",
                              "body-s-regular",
                              r.id === "none"
                                ? "colorGrey500"
                                : "colorGreyBlack",
                            ].join(" ")}
                          >
                            {r.name}
                          </span>
                        </MenuItem>
                      )
                    )}
                  </Select>
                </Box>
              );
            }}
          />
        )}

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
