import React, { useEffect } from "react";
import Icon from "../../components/icon/Icon";
import classNames from "classnames";
import { NavLink, Link } from "react-router-dom";

const MenuItem = ({ icon, link, text, sub, newTab, sidebarToggle, badge, mobileView, ...props }) => {
  let currentUrl;

  if (window.location.pathname !== undefined) {
    currentUrl = window.location.pathname;
  } else {
    currentUrl = null;
  }

  const menuItemClass = classNames({
    "nk-menu-item": true,
    "has-sub": sub,
    "active current-page": currentUrl === process.env.PUBLIC_URL + link,
  });
  return (
    <li className={menuItemClass}>
      {newTab ? (
        <Link
          to={`${process.env.PUBLIC_URL + link}`}
          target="_blank"
          rel="noopener noreferrer"
          className="nk-menu-link"
        >
          {icon ? (
            <span className="nk-menu-icon">
              <Icon name={icon} />
            </span>
          ) : null}
          <span className="nk-menu-text">{text}</span>
        </Link>
      ) : (
        <NavLink
          to={`${process.env.PUBLIC_URL + link}`}
          className={`nk-menu-link${sub ? " nk-menu-toggle" : ""}`}
          onClick={(e)=> {
            sub && e.preventDefault();
          }}
        >
          {icon ? (
            <span className="nk-menu-icon">
              <Icon name={icon} />
            </span>
          ) : null}
          <span className="nk-menu-text">{text}</span>
          {badge && <span className="nk-menu-badge">{badge}</span>}
        </NavLink>
      )}
      {sub ? (
         <MenuSub sub={sub} sidebarToggle={sidebarToggle} mobileView={mobileView} />
      ) : null}
    </li>
  );
};

const MenuSub = ({ icon, link, text, sub, sidebarToggle, mobileView, ...props }) => {
  return (
    <ul className="nk-menu-sub" style={props.style}>
      {sub.map((item) => (
        <MenuItem
          link={item.link}
          icon={item.icon}
          text={item.text}
          sub={item.subMenu}
          key={item.text}
          badge={item.badge}
          newTab={item.newTab}
          sidebarToggle={sidebarToggle}
          mobileView={mobileView}
        />
      ))}
    </ul>
  );
};

const Menu = ({ sidebarToggle, mobileView, menuData }) => {
  return (
    <ul className="nk-menu nk-menu-main">
      {menuData.map((item) =>
        <MenuItem
          key={item.text}
          link={item.link}
          icon={item.icon}
          text={item.text}
          badge={item.badge}
          sub={item.subMenu}
          sidebarToggle={sidebarToggle}
          mobileView={mobileView}
        />
      )}
    </ul>
  );
};

export default Menu;
