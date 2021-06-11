import React, { useState } from 'react';
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
import { useHistory } from "react-router";

export default function Settings() {
    const history = useHistory();
    const onClick = () => {
        let url = "https://carshare20210529215628.azurewebsites.net/api/customer/"
        let customerID = sessionStorage.getItem('customerID')
        const res = fetch(url + customerID, {
            method: "DELETE",
            headers: {
                "Content-type": "application/json",
            },
        })
            .then((response) => {
                if (response.ok) {
                    sessionStorage.clear();
                    history.push({
                        pathname: '/',
                    });
                    alert("Account Deleted");
                }
            })
            .catch((error) => {
                console.log(error);
            });

    }
    return (
        <ViewportProvider>
            <div className="SettingsWrapper">
                <WhichSideBar className="sideB"></WhichSideBar>
                <div className="settings">
                    <div className="rowProfile">
                        <div className="profileTitle">Settings</div>
                        <div className="settingsTitle">
                            <div className="blueT">Car</div>
                            <div className="yellowT">Share</div>
                            <div className="blueT">Scheme</div>
                        </div>
                    </div>


                    <div className="settingsPage">
                        <div className="delete">
                            <div className="deleteAccount">Do you wish to delete your account?</div>
                            <button onClick={() => {
                                const confirmBox = window.confirm(
                                  "Are you sure you want to Delete your Account? This Action is not reversible."
                                )
                                if (confirmBox === true) {
                                  onClick();
                                }
                              }} className="deleteBtn hvr-sweep-to-right-red">Delete Account</button>
                        </div>
                    </div>
                </div>
            </div>
        </ViewportProvider>
    )
}