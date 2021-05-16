import React, { Component } from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
  } from "react-router-dom";
import SideBar from './SideBar';
import SideBarMobile from './SideBarMobile';
import './styles/Profile.css';

const viewportContext = React.createContext({});

const ViewportProvider = ({ children }) => {
  const [width, setWidth] = React.useState(window.innerWidth);
  const [height, setHeight] = React.useState(window.innerHeight);
  const handleWindowResize = () => {
    setWidth(window.innerWidth);
    setHeight(window.innerHeight);
  };

  React.useEffect(() => {
    window.addEventListener("resize", handleWindowResize);
    return () => window.removeEventListener("resize", handleWindowResize);
  }, []);

  return (
    <viewportContext.Provider value={{ width, height }}>
      {children}
    </viewportContext.Provider>
  );
};

const useViewport = () => {
  const { width, height } = React.useContext(viewportContext);
  return { width, height };
};

const WhichSideBar = () => {
  const { width } = useViewport();
  const breakpoint = 1200;

  return width < breakpoint ? <SideBarMobile /> : <SideBar />;
};

export default function Profile(){
    return(
        <ViewportProvider>
            <div className = "profileWrapper">
                <WhichSideBar className = "sideB"></WhichSideBar>
                <div className = "profile">
                    <div className = "rowProfile">
                        <div className = "profileTitle">My Profile</div>
                        <div className = "pageTitle">
                            <div className = "blueT">Car</div>
                            <div className = "yellowT">Share</div>
                            <div className = "blueT">Scheme</div>
                        </div>
                    </div>
                    <div className = "profilePage">
                      <div className = "profileQuote">You can check and change any of your details here!</div>
                      <div className = "profileDetails">
                        <div className = "profileNames">
                          <div className = "profileFirst">
                              <div className = "profileLabel">Change Name</div>
                              <input type = "text" className = "profileText" placeholder = "  User First"></input>
                          </div>
                          <div className = "profileLast">
                              <div className = "profileLabel">Change Address</div>
                              <input type = "text" className = "profileText" placeholder = "  User Address"></input>
                          </div>
                        </div>
                        <br></br>
                        <div className = "profileContact">
                            <div className = "profileSignUpEmail">
                                <div className = "profileLabel">Change Email</div>
                                <input type = "email" className = "profileText" placeholder = "  User Email"></input>
                            </div>
                            <div className = "profilePhone">
                                <div className = "profileLabel">Change Phone Number</div>
                                <input type = "text" className = "profileText" placeholder = "  User Phone"></input>
                            </div>
                        </div>
                        <br></br>
                        <div className = "profilePasswords">
                          <div className = "profileSignUpPassword">
                              <div className = "profileLabel">Change Password</div>
                              <input type = "password" className = "profileText" placeholder = "  User Password"></input>
                          </div>
                          <div className = "profileConfirmPassword">
                              <div className = "profileLabel">Confirm New Password</div>
                              <input type = "password" className = "profileText" placeholder = "  Confirm Password"></input>
                          </div>
                        </div>
                        <br></br>
                        <button className = "saveProfile hvr-sweep-to-right">Save Changes</button>
                      </div>
                  </div>
                </div>
            </div>
        </ViewportProvider>
    );

}