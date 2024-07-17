import React from "react";
import styles from "./Avatar.module.css";
const Avatar = ({
  title,
  onClick,
}: {
  title: string;
  onClick: (event: React.MouseEvent<HTMLElement>) => void;
}) => {
  return (
    <div className={styles.avatarWrapper} onClick={onClick}>
      <span className={`${styles.avatar} body-l-medium`}>{title}</span>
    </div>
  );
};

export default Avatar;
