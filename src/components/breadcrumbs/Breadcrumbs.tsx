import React from "react";
import styles from "./Breadcrumbs.module.css";
import { Link } from "react-router-dom";
import { Icon_nav } from "./Icons";

const Breadcrumbs = ({
  data,
}: {
  data: { title: string; link?: string }[];
}) => {
  return (
    <div className={`${styles.breadcrumbsContainer}`}>
      {data.map((d, i) => (
        <React.Fragment key={i}>
          {d.title && (
            <div
              className={`${styles.breadcrumbsWrapper} ${
                i === data.length - 1 ? styles.active : ""
              }`}
            >
              <Icon_nav />
              <div className={styles.container} key={i}>
                {i !== data.length - 1 ? (
                  <>
                    <Link to={d.link || "/"}>
                      <span className={`${styles.text} body-s-medium`}>
                        {`${d.title}`}
                      </span>
                    </Link>
                  </>
                ) : (
                  <span className={`${styles.text} body-s-medium`}>
                    {`${d.title}`}
                  </span>
                )}
              </div>
            </div>
          )}
          {i !== data.length - 1 && (
            <span className={`${styles.divider} body-l-regular`}>/</span>
          )}
        </React.Fragment>
      ))}
    </div>
  );
};

export default Breadcrumbs;
