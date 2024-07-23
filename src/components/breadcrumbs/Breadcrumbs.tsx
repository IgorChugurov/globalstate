import React, { useContext, useEffect, useState } from "react";
import styles from "./Breadcrumbs.module.css";
import { Link } from "react-router-dom";
import {
  Icon_account_balance,
  Icon_adjust,
  Icon_language,
  Icon_nav,
} from "./Icons";
import { GlobalStateContext } from "../../context/GlobalStateProvider";

const Breadcrumbs = ({
  data = [],
}: {
  data: { title: string; link?: string }[];
}) => {
  const { currentProject, state } = useContext(GlobalStateContext);
  const [items, setItems] = useState<{ title: string; link?: string }[]>([]);

  const project = state["projects"].list.find(
    (p: any) => p._id === currentProject
  );
  useEffect(() => {
    setItems([{ title: project?.name || "application", link: "/" }, ...data]);
  }, [data, project]);

  return (
    <div className={`${styles.breadcrumbsContainer}`}>
      {items.map((d, i) => (
        <React.Fragment key={i}>
          {d.title && (
            <div
              className={`${styles.breadcrumbsWrapper} ${
                i === items.length - 1 ? styles.active : ""
              }`}
            >
              {getIcon(i)}
              <div className={styles.container} key={i}>
                {i !== items.length - 1 ? (
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
          {i !== items.length - 1 && (
            <span className={`${styles.divider} body-l-regular`}>/</span>
          )}
        </React.Fragment>
      ))}
    </div>
  );
};

export default Breadcrumbs;

const getIcon = (index: number) => {
  const icons = [
    <Icon_language />,
    <Icon_nav />,
    <Icon_adjust />,
    <Icon_account_balance />,
  ];

  return index < icons.length ? icons[index] : null;
};
