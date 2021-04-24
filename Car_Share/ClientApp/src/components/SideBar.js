import React, { Component } from 'react';
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

function SideBar(){
    return(
        <div id = "sideBarWrapper">
            <ProSidebar>
                <SidebarHeader>
                    <div className="logoText">
                        <img></img>
                        <br></br>
                        <div className = "welcomeBack">Welcome Back,</div>
                        <div className = "userName">Username</div> {/*get username from database*/}
                    </div>
                </SidebarHeader>
                <Menu iconShape="square">
                    <MenuItem><img className = "homeLogo" src = {homeLogo}></img>Home</MenuItem>
                    <MenuItem><img className = "historyLogo" src = {historyLogo}></img>History</MenuItem>
                    <MenuItem><img className = "profileLogo" src = {profileLogo}></img>Profile</MenuItem>
                    <MenuItem><img className = "reportLogo" src = {reportLogo}></img>Report a Problem</MenuItem>
                    <MenuItem><img className = "settingsLogo" src = {settingsLogo}></img>Settings</MenuItem>
                    <br></br>
                    <button className = "logOutBtn">SIGN OUT</button>
                </Menu>
            </ProSidebar>
        </div>
    )
}

export default SideBar;