const InputLabel = ({
  options,
  label,
}: {
  label: string;
  options: {
    isInvalid: boolean;
    disabled?: boolean;
    isFocused: boolean;
    isHovered: boolean;
    required?: boolean;
  };
}) => {
  const { isInvalid, disabled, isFocused, isHovered, required } = options;
  const labelColor = isInvalid
    ? "var(--system-error,#ff453a)"
    : disabled
    ? "var(--Grey-300, #7C7C7C)"
    : isFocused
    ? "var(--primary-600,#0768fd)"
    : isHovered
    ? "var(--grey-black)"
    : "var(--grey-600)";
  return (
    <div className="labelWrapper">
      <span
        className="body-xs-regular colorGrey500"
        style={{ color: labelColor }}
      >
        {label}
      </span>
      {required && <span className="body-xs-regular colorSystemError ">*</span>}
    </div>
  );
};

export default InputLabel;
