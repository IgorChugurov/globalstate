import * as React from "react";
import { GridOverlay } from "@mui/x-data-grid";
import styles from "./CustomNoRowsOverlay.module.css";
import { useState } from "react";

const NoRowsOverlay: React.FC<{ title?: string; messages?: string[] }> = ({
  title,
  messages,
}) => {
  const [titleComponent] = useState(title || "You have no items");
  const [messagesComponent] = useState(
    messages || [
      "Item that you create will end up here.",
      "Add a new item to get started.",
    ]
  );

  return (
    <GridOverlay className={styles.overlay}>
      <div className={styles.emptyStateContainer}>
        <span className={`${styles.headerEmptyState} headings-h2`}>
          {titleComponent}
        </span>
        <div className={styles.emptyStateTextWrapper}>
          {messagesComponent.map((message, index) => (
            <span
              key={index}
              className={`${styles.headerEmptyText} body-m-regular`}
            >
              {message}
            </span>
          ))}
        </div>
      </div>
    </GridOverlay>
  );
};
export default NoRowsOverlay;
