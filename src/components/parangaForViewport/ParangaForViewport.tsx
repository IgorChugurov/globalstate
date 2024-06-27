import { useEffect, useState } from "react";
import styles from "./styles.module.css";
export const ParangaForViewport = () => {
  const [dispalyElement, setDispalyElement] = useState(false);
  const parangaSetDisplay = () => {
    setDispalyElement(true);
  };
  const parangaSetHide = () => {
    setDispalyElement(false);
  };
  useEffect(() => {
    window.addEventListener("hideParange", parangaSetHide);
    window.addEventListener("showParange", parangaSetDisplay);

    return () => {
      window.removeEventListener("hideParange", parangaSetHide);
      window.removeEventListener("showParange", parangaSetDisplay);
    };
  }, []);
  return (
    <>
      {dispalyElement && (
        <div className={styles.container}>
          <div className={styles.loader}></div>
        </div>
      )}
    </>
  );
};

export default ParangaForViewport;
