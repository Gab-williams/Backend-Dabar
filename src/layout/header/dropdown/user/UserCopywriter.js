import React, { useState, useEffect } from "react";
import UserAvatar from "../../../../components/user/UserAvatar";
import { DropdownToggle, DropdownMenu, Dropdown } from "reactstrap";
import { Icon } from "../../../../components/Component";
import { LinkList, LinkItem } from "../../../../components/links/Links";
import { useTheme, useThemeUpdate } from "../../../provider/Theme";
import { AES, enc } from 'crypto-js';
import axios from 'axios';
const User = () => {
  const theme = useTheme();
  const themeUpdate = useThemeUpdate();
  const [open, setOpen] = useState(false);
  const [userinfo, Setuserinfo] = useState("")
  const toggle = () => setOpen((prevState) => !prevState);
  // console.log(window.location.origin)
  const original = window.location.origin

  const apiClient = axios.create({
    baseURL: "http://127.0.0.1:8000/",
    withCredentials: true
  });
  useEffect(()=>{
    const local = localStorage.getItem('thedabar')
    if(local){
     let answer =   JSON.parse(AES.decrypt(localStorage.getItem('thedabar'), 'TheDabar').toString(enc.Utf8))
     Setuserinfo(userinfo=>answer)
    }else{
      // localStorage.removeItem('thedabar')
      // window.location.href=`${original}/demo9/auth-login`;
    }
  },[userinfo])

  const handleLogout = ()=>{
    let local = localStorage.getItem('thedabar')?JSON.parse(AES.decrypt(localStorage.getItem('thedabar'), 'TheDabar').toString(enc.Utf8)):{}

    let url = 'api/logout'
    apiClient.get('/sanctum/csrf-cookie').then(()=>{
      apiClient.get(url,   {
        headers:{
          "Authorization":"Bearer "+local.token,
          }
      }).then(res=>{
        console.log(res)
        if(res.data.success){
          localStorage.removeItem('thedabar')
          window.location.href=`${original}/demo9/auth-login`;

        }
      })
    })

  }





  return (
    <Dropdown isOpen={open} className="user-dropdown" toggle={toggle}>
      <DropdownToggle
        tag="a"
        href="#toggle"
        className="dropdown-toggle"
        onClick={(ev) => {
          ev.preventDefault();
        }}
      >
        <div className="user-toggle">
          <UserAvatar icon="user-alt" className="sm" />
        </div>
      </DropdownToggle>
      <DropdownMenu end className="dropdown-menu-md">
        <div className="dropdown-inner user-card-wrap bg-lighter d-none d-md-block">
          <div className="user-card sm">
            <div className="user-avatar">
              <span>AB</span>
            </div>
            <div className="user-info">
              <span className="lead-text">{userinfo != undefined || userinfo != null || Object.keys(userinfo).length > 0?userinfo.name:""}</span>
              <span className="sub-text">{userinfo != undefined || userinfo != null || Object.keys(userinfo).length > 0?userinfo.email:""}</span>
            </div>
          </div>
        </div>
        <div className="dropdown-inner">
          <LinkList>
            <LinkItem link="/demo9/copywriter/profile" icon="user-alt" onClick={toggle}>
              View Profile
            </LinkItem>
            <LinkItem link="/demo9/copywriter/history" icon="clock" onClick={toggle}>
              History
            </LinkItem>
            <li>
              <a className={`dark-switch ${theme.skin === 'dark' ? 'active' : ''}`} href="#" 
              onClick={(ev) => {
                ev.preventDefault();
                themeUpdate.skin(theme.skin === 'dark' ? 'light' : 'dark');
              }}>
                {theme.skin === 'dark' ? 
                  <><em className="icon ni ni-sun"></em><span>Light Mode</span></> 
                  : 
                  <><em className="icon ni ni-moon"></em><span>Dark Mode</span></>
                }
              </a>
            </li>
          </LinkList>
        </div>
        <div className="dropdown-inner">
          <LinkList>
          {/* href={`${process.env.PUBLIC_URL}/auth-login`} */}
            <a  style={{ cursor:"pointer" }} onClick={handleLogout}>
              <Icon name="signout"></Icon>
              <span style={{ cursor:"pointer" }} onClick={handleLogout} >Sign Out</span>
            </a>
          </LinkList>
        </div>
      </DropdownMenu>
    </Dropdown>
  );
};

export default User;
