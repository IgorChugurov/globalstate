import React from "react";
import styles from "./Breadcrumbs.module.css";
import { Link } from "react-router-dom";

const Breadcrumbs = ({
  data,
}: {
  data: { title: string; link?: string }[];
}) => {
  return (
    <div className={styles.container}>
      {data.map((d, i) => (
        <React.Fragment key={i}>
          {i !== data.length - 1 ? (
            <>
              <Link
                to={d.link || "/"}
                className={
                  i !== data.length - 1 ? styles.text : styles.textLast
                }
              >
                {`${d.title}`}
              </Link>
              <span className={styles.text}>/</span>
            </>
          ) : (
            <span
              className={i !== data.length - 1 ? styles.text : styles.textLast}
            >
              {d.title}
            </span>
          )}
        </React.Fragment>
      ))}
    </div>
  );
};

export default Breadcrumbs;
