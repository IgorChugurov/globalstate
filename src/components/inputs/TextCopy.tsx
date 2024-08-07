import { useFormContext } from "react-hook-form";
import { useState } from "react";
import InputLabel from "./InputLabel";
import styles from "./TextCopy.module.css";
import { Icon_copy } from "./Icons";
import { copyToClipBoardUtil } from "../../utils/copyToClipboard";
const isFormInvalid = (err: any) => {
  if (Object.keys(err).length > 0) return true;
  return false;
};

export const TextCopy = ({
  name,
  label,
  placeholder,
  disabled,
  helperText,
  required,
  value,
}: {
  name: string;
  label?: string;

  placeholder?: string;
  disabled?: boolean;
  helperText?: string;
  required?: boolean;
  value: string;
}) => {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  const inputErrors = findInputError(errors, name);
  const isInvalid = isFormInvalid(inputErrors);
  const items = []; // Add this line to define the 'items' variable.

  const [isFocused, setIsFocused] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div className={styles.container}>
      {/* {label && (
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
      )} */}

      <div
        className={styles.linkContainer}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div className={styles.labelContainer}>
          <span className="body-xs-regular colorGrey500">{label}</span>
        </div>
        <div className={styles.inputContainer}>
          <span
            className={`body-s-regular colorGrey500 ${styles.lognTextWithScroll}`}
          >
            {value}
          </span>
          <Icon_copy
            className={styles.copy_icon}
            onClick={() => copyToClipBoardUtil(value, `${label} was copied`)}
          />
        </div>
      </div>

      {/* <div
        className={`${styles.inputContainer}`}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <span className={`body-s regular colorGrey500 textWithEllipsis`}>
          {value}
        </span>
        <Icon_copy
          className={styles.copy_icon}
          // onClick={() => copyToClipBoard("apiKey", "API key was copied")}
        />
      </div> */}

      {helperText && !isInvalid && (
        <span
          className="body-xs-regular colorGrey600"
          style={{ lineHeight: "12px" }}
        >
          {helperText}
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
