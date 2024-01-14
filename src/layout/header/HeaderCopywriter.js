import React, {useState, useEffect} from "react";
import classNames from "classnames";
import Toggle from "../sidebar/Toggle";
import Logo from "../logo/Logo";
import User from "./dropdown/user/UserCopywriter";
import Notification from "./dropdown/notification/Notification";
import LanguageHead from "./dropdown/language/Language";
import Menu from "../menu/MenuHeader";
import {copywriterheadermenu} from "../menu/MenuData";

import { useTheme, useThemeUpdate } from '../provider/Theme';

const Header = ({ fixed, className, ...props }) => {

  const [sticky, setSticky] = useState(false);
  
  const theme = useTheme();
  const themeUpdate = useThemeUpdate();

  const headerClass = classNames({
    "nk-header": true,
    "nk-header-fixed": fixed,
    "has-fixed": sticky,
    [`is-light`]: theme.header === "white",
    [`is-${theme.header}`]: theme.header !== "white" && theme.header !== "light",
    [`${className}`]: className,
  });

  useEffect(() => {
    let _item_offset = 30;
    if (window.scrollY > _item_offset) {
      setSticky(true);
    } else {
      setSticky(false);
    }
  }, [window.scrollY])
  

  return (
    <div className={headerClass}>
      <div className="container-xl wide-xl">
        <div className="nk-header-wrap">
          <div className="nk-menu-trigger d-xl-none ms-n1">
            <Toggle
              className="nk-nav-toggle nk-quick-nav-icon d-xl-none ms-n1 me-3"
              icon="menu"
              click={themeUpdate.sidebarVisibility}
            />
          </div>
          <div className="nk-header-brand d-xl-none">
            <Logo to={`${process.env.PUBLIC_URL}/copywriter`} />
          </div>
          <div className="nk-header-menu is-light">
            <div className="nk-header-menu-inner">
              <Menu menuData={copywriterheadermenu} />
            </div>
          </div>
          <div className="nk-header-tools">
            <ul className="nk-quick-nav">
              <li className="notification-dropdown me-n1">
                <Notification />
              </li>
              <li className="language-dropdown d-none d-sm-block me-n1" >
                <LanguageHead />
              </li>
              <li className="user-dropdown">
                <User />
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Header;
