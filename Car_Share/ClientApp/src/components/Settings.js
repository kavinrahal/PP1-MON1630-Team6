import React, { Component, useState } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import SideBar from './SideBar';
import SideBarMobile from './SideBarMobile';
import './styles/Settings.css';
import { ViewportProvider, WhichSideBar } from './ViewPort_Helper';

export default function Settings() {
    return (
        <ViewportProvider>
        <div className="SettingsWrapper">
        <WhichSideBar className="sideB"></WhichSideBar>
            <div className = "settings">
                <div className = "rowProfile">
                    <div className="profileTitle">Settings</div>
                    <div className="settingsTitle">
                        <div className="blueT">Car</div>
                        <div className="yellowT">Share</div>
                        <div className="blueT">Scheme</div>
                    </div>
                </div>
                

                <div className = "settingsPage">
                    <div className = "delete">
                        <div className = "deleteAccount">Do you wish to delete your account?</div>
                        <button className = "deleteBtn hvr-sweep-to-right-red">Delete Account</button>
                    </div>
                </div>
            </div>
        </div>
        </ViewportProvider>
    )
}