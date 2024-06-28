import React, { useContext, useState } from "react";
import styles from "./DarkModeSwitch.module.css"; // Import the CSS
import { GlobalStateContext } from "../../context/GlobalStateProvider";

const DarkModeSwitch = ({ size }: { size?: string }) => {
  const { darkMode, toggleDarkMode } = useContext(GlobalStateContext);
  const [isChecked, setIsChecked] = useState(
    darkMode === "dark" ? true : false
  );

  const toggleSwitch = () => {
    setIsChecked(!isChecked);
    toggleDarkMode();
  };

  return (
    <label data-size={size} className={`${styles.switch}`}>
      <input type="checkbox" checked={isChecked} onChange={toggleSwitch} />
      <span className={styles.slider}></span>
    </label>
  );
};

export default DarkModeSwitch;
