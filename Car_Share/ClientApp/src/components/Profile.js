import React, { Component } from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
  } from "react-router-dom";
import SideBar from './SideBar';
import SideBarMobile from './SideBarMobile';
import './styles/Dashboard.css';
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
                <div className = "profile">
                    <div className = "rowProfile">
                        <div className = "profileTitle">Profile</div>
                        <div className = "pageTitle">
                            <div className = "blueT">Car</div>
                            <div className = "yellowT">Share</div>
                            <div className = "blueT">Scheme</div>
                        </div>
                    </div>
                </div>
            </div>
        </ViewportProvider>
    );

}