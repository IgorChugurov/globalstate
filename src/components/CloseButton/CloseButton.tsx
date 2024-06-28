import React from "react";

const CloseButton = ({ onClick }: { onClick: () => void }) => {
  return (
    <div className="icon_container" onClick={onClick}>
      <CloseOutlinedIcon />
    </div>
  );
};

export default CloseButton;

export const CloseOutlinedIcon: React.FC = () => {
  return (
    <svg
      fill="currentColor"
      focusable="false"
      aria-hidden="true"
      viewBox="0 0 24 24"
      width="16" // Set width to 16px
      height="16" // Set height to 16px
    >
      <path d="M19 6.41 17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"></path>
    </svg>
  );
};
