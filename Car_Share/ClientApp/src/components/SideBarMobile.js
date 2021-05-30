import React, { Component, useState } from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
  } from "react-router-dom";
import { ProSidebar,
    Menu,
    MenuItem,
    SubMenu,
    SidebarHeader,
    SidebarFooter,
    SidebarContent } from 'react-pro-sidebar';
import 'react-pro-sidebar/dist/css/styles.css';
import './styles/SideBar.css';
import homeLogo from '../addons/home.png';
import historyLogo from '../addons/history.png';
import profileLogo from '../addons/profile.png';
import reportLogo from '../addons/report.png';
import settingsLogo from '../addons/settings.png';

import openMenu from '../addons/OpenMenu.svg';
import closeMenu from '../addons/CloseMenu.svg';

const SideBarMobile = () => {
  
    //create initial menuCollapse state using useState hook
    const [menuCollapse, setMenuCollapse] = useState(true)

    //create a custom function that will change menucollapse state from false to true and true to false
    const menuIconClick = () => {
    
    //condition checking to change state from true to false and vice versa
    menuCollapse ? setMenuCollapse(false) : setMenuCollapse(true);
    };
    return(
        <div id = "sideBarWrapper">
            <ProSidebar collapsed = {menuCollapse}>
                <SidebarHeader>
                    <div className="closemenu" onClick={menuIconClick}>
                        {/* changing menu collapse icon on click */}
                        {menuCollapse ? (
                            <img src ={openMenu}  className = "arrow"></img>
                        ) : (
                            <div>
                                <img src = {closeMenu} className = "arrow" ></img>
                                <div className="logoText">
                                    <img></img>
                                    <br></br>
                                    <div className = "welcomeBack">Welcome Back,</div>
                                    <div className = "userName">Username</div> {/*get username from database*/}
                                </div>
                            </div>
                        )}
                    </div>
                </SidebarHeader>
                <Menu iconShape="square">
                    <MenuItem><Link to = "dashboard"><img className = "homeLogo" src = {homeLogo}></img>Home</Link></MenuItem>
                    <MenuItem><Link to = "booking_history"><img className = "historyLogo" src = {historyLogo}></img>History</Link></MenuItem>
                    <MenuItem><Link to = "profile"><img className = "profileLogo" src = {profileLogo}></img>Profile</Link></MenuItem>
                    <MenuItem><img className = "reportLogo" src = {reportLogo}></img>Report a Problem</MenuItem>
                    <MenuItem><img className = "settingsLogo" src = {settingsLogo}></img>Settings</MenuItem>
                    <br></br>
                    <button className = "logOutBtn hvr-sweep-to-right-red"><Link to = "/">SIGN OUT</Link></button>
                </Menu>
            </ProSidebar>
        </div>
    );
}

export default SideBarMobile;