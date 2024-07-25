import React, { useContext, useEffect, useState } from "react";
import styles from "./Breadcrumbs.module.css";
import { Link, useLocation } from "react-router-dom";
import {
  Icon_account_balance,
  Icon_adjust,
  Icon_language,
  Icon_nav,
} from "./Icons";
import { GlobalStateContext } from "../../context/GlobalStateProvider";

const Breadcrumbs = ({}: {}) => {
  const location = useLocation();
  const { currentProject, state, routeData } = useContext(GlobalStateContext);
  const [items, setItems] = useState<{ title: string; link?: string }[]>([]);
  const [project, setProject] = useState<any>({});
  const [breadcrumbsData, setBreadcrumbsData] = useState<
    { title: string; link?: string }[]
  >([]);

  useEffect(() => {
    const data: { title: string; link?: string }[] = [
      { title: project?.name || "application", link: "/" },
    ];
    const arr = location.pathname.split("/");
    if (location.pathname === "/" || location.pathname === "/groups") {
      data.push({ title: "Company groups", link: "/" });
    } else if (arr[1] === "groups") {
      const groupCompanies = routeData?.groupCompanies;
      const titleGroup = groupCompanies?.name || groupCompanies?.title || "";
      data.push({ title: "Company groups", link: "/" }, { title: titleGroup });

      if (arr.length === 4) {
        data[2].link = `/groups/${arr[2]}`;
        const company = routeData?.company;
        const titleCompany = company?.name || company?.title || "";
        data.push({ title: titleCompany });
      }
    } else if (location.pathname === "/environments") {
      data.push({ title: "Environments", link: "/environments" });
    } else if (location.pathname === "/settings") {
      data.push({ title: "Settings", link: "/settings" });
    }
    setBreadcrumbsData(data);
  }, [location.pathname, routeData, project]);

  useEffect(() => {
    const p =
      (state["projects"] &&
        state["projects"].list.find((p: any) => p._id === currentProject)) ||
      {};
    setProject(p);
  }, [currentProject, state["projects"].list]);
  return (
    <div className={`${styles.breadcrumbsContainer}`}>
      {breadcrumbsData.map((d, i) => (
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
