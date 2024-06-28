import React, { useContext } from "react";
import styles from "./darkModeSwitchWithSVG.module.css"; // Стили будут импортированы из отдельного CSS файла
import { GlobalStateContext } from "../../context/GlobalStateProvider";

const DarkModeSwitchWithSVG = () => {
  const { darkMode, toggleDarkMode } = useContext(GlobalStateContext);
  const toggleSwitch = () => {
    toggleDarkMode();
  };

  return (
    <div className={`${styles.switch} ${darkMode}`} onClick={toggleSwitch}>
      <div className={`${styles.thumb}`}></div>
      <div className={`${styles.track}`}></div>
    </div>
  );
};

export default DarkModeSwitchWithSVG;
