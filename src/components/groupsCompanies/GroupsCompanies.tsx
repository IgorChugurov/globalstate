// this is component for list of goups of companies
// the ldata stucture is written in the file src/types/groupCompanies.ts
import React, { useEffect, useState } from "react";
import styles from "./GroupsCompanies.module.css";
import { Icon_Plus } from "../icons/Icons";
import { Link, Outlet, useLocation } from "react-router-dom";
import { IEditField, IOptionsListItem } from "../../types/appdata";
import Createmodal from "../appmodal/Createmodal";
import { servicesPackage } from "../../services/servicesPackage";
const dumnData = [
  {
    _id: "1",
    id: "1",
    name: "Group 1",
    companies: [
      { _id: "1", name: "company1 name " },
      { _id: "2", name: "company2 name " },
      { _id: "3", name: "company3 name " },
      { _id: "11", name: "company11 name " },
      { _id: "21", name: "company21 name " },
      { _id: "31", name: "company31 name " },
    ],
    updatedAt: "data",
  },
  {
    _id: "12",
    name: "Group new",
    companies: [
      { _id: "12", name: "GN company1 name " },
      { _id: "23", name: "GN company2 name " },
      { _id: "34", name: "GN company3 name " },
      { _id: "115", name: "GN company11 name " },
      { _id: "216", name: "GN company21 name " },
      { _id: "316", name: "GN company31 name " },
      { _id: "3162", name: "GN company312 name " },
    ],
    updatedAt: "data",
  },
  {
    _id: "2",
    name: "Group 2",
    companies: [
      { _id: "1", name: "G2 company1 name " },
      { _id: "2", name: "G2 company2 name " },
      { _id: "3", name: "G2 company3 name " },
      { _id: "11", name: "G2 company11 name " },
      { _id: "21", name: "G2 company21 name " },
      { _id: "31", name: "G2 company31 name " },
    ],
  },
];

const GroupsCompanies = ({
  initDataGroupCompanies,
}: {
  initDataGroupCompanies: IOptionsListItem;
}) => {
  const itemsService = servicesPackage["groupCompanies"];
  const [modalCreateOpen, setModalCreateOpen] = useState(false);
  // get data from initDataGroupsCompanies for create new group of companies
  const { forEdit, title, forList } = initDataGroupCompanies;
  const buttonTitle = forList.buttonBlock?.title || "new company group";
  const allFields: IEditField[] = forEdit.sections.reduce(
    (acc: any, section: any) => {
      acc = [...acc, ...section.fields];
      return acc;
    },
    []
  );

  const location = useLocation();
  const [groupsCompanies, setGroupsCompanies] = useState(dumnData);
  const createGroupCompamies = (data: any) => {
    console.log(data);
  };
  useEffect(() => {
    itemsService.getAll().then((res) => {
      //console.log(res);
      //setCompaniesGroup(res)
    });
  }, []);

  return (
    <>
      {modalCreateOpen && (
        <Createmodal
          fields={allFields}
          dataForPage={forEdit}
          openModal={modalCreateOpen}
          handleCloseModal={() => setModalCreateOpen(false)}
          setOpenModal={setModalCreateOpen}
          handleAction={createGroupCompamies}
        />
      )}
      <div
        className={`${styles.container} ${
          location.pathname !== "/groups" ? "hidden" : ""
        }`}
      >
        <div className={styles.tabsButton}>
          <span className={styles.title}>{title}</span>
          <button
            className={`button primaryButton`}
            data-size="small"
            onClick={() => setModalCreateOpen(true)}
          >
            <Icon_Plus />
            {buttonTitle}
          </button>
        </div>
        <div className={styles.companiesGroup}>
          {groupsCompanies.map((group) => (
            <GroupCompanies group={group} key={group._id} />
          ))}
        </div>
      </div>
      <Outlet />
    </>
  );
};

export default GroupsCompanies;

const GroupCompanies = ({ group }: { group: any }) => {
  return (
    <Link to={`/groups/${group._id}`}>
      <div className={styles.groupCard}>
        <div className={styles.companies}>
          {Array.from({ length: 4 }).map((_, index) => (
            <div className={styles.company} key={index}>
              {group.companies && group.companies[index] && (
                <span className={styles.companyTitle}>
                  {group.companies[index].name}
                </span>
              )}
            </div>
          ))}
        </div>
        <div className={styles.cardFooter}>
          <span className={styles.groupTitle}>{group.name}</span>
          <div className={styles.groupInfoWrapper}>
            <span className={styles.groupInfo}>
              {`${group.companies.length} companies • Updated ${group.updatedAt}`}
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
};
