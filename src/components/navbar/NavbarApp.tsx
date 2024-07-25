import React, { useContext, useEffect, useState } from "react";
import useWindowDimensions from "../../hooks/windowDimensions";

import styles from "./NavbarApp.module.css";

import { Menu, MenuItem } from "@mui/material";

import { UserDataContext } from "../../context/userDataContext";
import { Link, useLocation } from "react-router-dom";

import { Icon_Move_item, Icon_Person } from "./Icons";
import { GlobalStateContext } from "../../context/GlobalStateProvider";
import { Icon_Logo, Icon_Setting } from "../icons/Icons";
import Breadcrumbs from "../breadcrumbs/Breadcrumbs";
import Avatar from "../avatar/Avatar";
import NavItem from "../navItem/NavItem";

const NavbarApp = () => {
  const { userData } = useContext(UserDataContext);

  const { toggleDarkMode, TITLE, VERSION } = useContext(GlobalStateContext);

  const userTitle = (userData?.email || "PP").substring(0, 2);
  const { windowWidth } = useWindowDimensions();

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const loguot = () => {
    localStorage.clear();
    window.location.href = "/";
  };
  const handleToggleMode = (event: React.MouseEvent<HTMLElement>) => {
    event.preventDefault();
    toggleDarkMode();
  };
  // set data for breadcrumbs

  return (
    <>
      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        //onClick={handleClose}
        slotProps={{
          paper: {
            className: "menuPaper",
            sx: { width: "240px", paddingBottom: "4px" },
          },
        }}
        transformOrigin={{ horizontal: "right", vertical: "top" }}
        anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
      >
        <div className={`${styles.menuItemContainer} menuItem`}>
          <div className={`${styles.menuItemWrap}`}>
            <span className="body-m-bold colorGreyBlack textWithEllipsis">
              {userData?.email}
            </span>
          </div>
        </div>
        <div className={`${styles.menuItemAsBorder}`} />
        <Link to={`/profile`} style={{ width: "100%" }}>
          <MenuItem className="menuItem">
            <Icon_Person />
            <div className={`${styles.menuItemWrap}`}>
              <span className="body-s-regular colorGreyBlack textWithEllipsis">
                Profile
              </span>
            </div>
          </MenuItem>
        </Link>

        <MenuItem onClick={() => loguot()} className="menuItem">
          <Icon_Move_item />
          <div className={`${styles.menuItemWrap}`}>
            <span className="body-s-regular colorGreyBlack textWithEllipsis">
              Log out
            </span>
          </div>
        </MenuItem>
        <div className={`${styles.menuItemAsBorder}`} />

        <div className={`${styles.menuItemContainer} menuItem`}>
          <div className={`${styles.menuItemWrap}`}>
            <span className="body-xs-regular colorGrey500 textWithEllipsis">
              Version {VERSION}
            </span>
          </div>
        </div>
      </Menu>

      <div id="navbar" className={styles.container}>
        <div className={styles.left}>
          <div className={styles.logoWrapper}>
            <Link to={`/`}>
              <Icon_Logo />
            </Link>
          </div>
          <div className={styles.navigationItems}>
            <NavItem title="Companies" link="/" startRoute="groups" />
            <NavItem title="Environments" link="/environments" />
          </div>
        </div>

        <div className={styles.center}>
          <Breadcrumbs />
        </div>
        <div className={styles.right}>
          <Link to={`/settings`}>
            <button
              className={`iconButton primaryIconButton`}
              data-size="small"
            >
              <Icon_Setting />
            </button>
          </Link>
          <Avatar title={userTitle} onClick={handleClick} />
        </div>
      </div>
    </>
  );
};

export default NavbarApp;
