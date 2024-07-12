import React from "react";
import styles from "./Tabs.module.css";
const Tabs = ({
  tab,
  setTab,
  tabs,
}: {
  tab: number;
  setTab: (d: number) => void;
  tabs: string[];
}) => {
  return (
    <div className={styles.container}>
      {tabs.map((t, i) => (
        <div
          key={i}
          onClick={() => setTab(i)}
          className={`${styles.tab} ${tab === i ? styles.active : ""}`}
        >
          {t}
        </div>
      ))}
    </div>
  );
};

export default Tabs;
