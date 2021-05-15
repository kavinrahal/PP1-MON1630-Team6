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
import allCars from '../addons/AllCarsLogo.svg';
import locateLogo from '../addons/LocateLogo.png';
import searchLogo from '../addons/SearchLogo.svg';
import cityback from '../addons/City Backdrop.svg';

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
                <WhichSideBar></WhichSideBar>
                <div className = "profile">
                    <div className = "rowProfile">
                        <div className = "profileTitle">Profile</div>
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
                              <div className = "signUpLabel">Change Name</div>
                              <input type = "text" className = "signUpText" placeholder = "  User First"></input>
                          </div>
                          <div className = "profileLast">
                              <div className = "signUpLabel">Change Address</div>
                              <input type = "text" className = "signUpText" placeholder = "  User Address"></input>
                          </div>
                        </div>
                        <br></br>
                        <div className = "profileContact">
                            <div className = "profileSignUpEmail">
                                <div className = "signUpLabel">Change Email</div>
                                <input type = "email" className = "signUpText" placeholder = "  User Email"></input>
                            </div>
                            <div className = "profilePhone">
                                <div className = "signUpLabel">Change Phone Number</div>
                                <input type = "text" className = "signUpText" placeholder = "  User Phone"></input>
                            </div>
                        </div>
                        <br></br>
                        <div className = "profilePasswords">
                          <div className = "profileSignUpPassword">
                              <div className = "signUpLabel">Change Password</div>
                              <input type = "password" className = "signUpText" placeholder = "  User Password"></input>
                          </div>
                          <div className = "profileConfirmPassword">
                              <div className = "signUpLabel">Confirm New Password</div>
                              <input type = "password" className = "signUpText" placeholder = "  Confirm Password"></input>
                          </div>
                        </div>
                        <br></br>
                        <button className = "saveProfile">Save Changes</button>
                      </div>
                  </div>
                </div>
            </div>
        </ViewportProvider>
    );

}