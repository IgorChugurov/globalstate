import React, { useContext } from "react";
import useWindowDimensions from "../../hooks/windowDimensions";

import styles from "./NavbarApp.module.css";

import { Menu, MenuItem } from "@mui/material";

import { UserDataContext } from "../../context/userDataContext";
import { Link } from "react-router-dom";

import { Icon_folder_closed, Icon_Move_item, Icon_Person } from "./Icons";
import { GlobalStateContext } from "../../context/GlobalStateProvider";
import { Icon_Logo, Icon_Setting } from "../icons/Icons";

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
          <div
            className={`${styles.mainMenuItemWrapper} ${
              location.pathname === "/groups" ? styles.active : ""
            }`}
          >
            <Link to={`/groups`} className={styles.mainMenuItem}>
              Company Management
            </Link>
          </div>
          <div
            className={`${styles.mainMenuItemWrapper} ${
              location.pathname === "/environment" ? styles.active : ""
            }`}
          >
            <Link to={`/environment`} className={styles.mainMenuItem}>
              Environment
            </Link>
          </div>
        </div>
        <div className={styles.right}>
          <div className={styles.buttonWrapper}>
            <Icon_Setting />
          </div>
          <div className={styles.avatarWrapper} onClick={handleClick}>
            <span className={styles.avatar}>{userTitle}</span>
          </div>
        </div>

        {/* <Link to={`/products`} className={styles.logoWrap}>
          <Icon_folder_closed />
          <div className={styles.logoTitleWrap}>
            <span className={styles.firstTitle}>WEB.</span>
            <span className={styles.secondTitle}>deal</span>
          </div>
        </Link>
        <div className={styles.menuWrap}>
          <div className={styles.itemMenuWrap}>
            <Link
              to={`/users`}
              className={[
                styles.itemMenu,
                "colorGreyBlack",
                location.pathname === "/users"
                  ? "body-m-bold"
                  : "body-m-medium",
              ].join(" ")}
            >
              Users
            </Link>
          </div>
          <div className={styles.itemMenuWrap}>
            <Link
              to={`/products`}
              className={[
                styles.itemMenu,
                "colorGreyBlack",
                location.pathname === "/products"
                  ? "body-m-bold"
                  : "body-m-medium",
              ].join(" ")}
            >
              Products
            </Link>
          </div>
        </div>

        <div
          className={`${styles.titleWrap} ${anchorEl ? styles.active : ""}`}
          onClick={handleClick}
        >
          <span
            className="body-s-regular colorGreyBlack"
            style={{
              textTransform: "uppercase",
            }}
          >
            {usetTitle}
          </span>
        </div> */}
      </div>
    </>
  );
};

export default NavbarApp;
