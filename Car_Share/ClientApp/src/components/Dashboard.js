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

export default function Dashboard() {
  return (
    <ViewportProvider>
      <div className = "dashboardWrapper">
        <WhichSideBar />
        <div className = "dashboard">
          {/*<div className = "cityBack"><img src = {cityback}></img></div>*/}
          <div className = "row1 dashTitle">
            <div className = "blueT">Car</div>
            <div className = "yellowT">Share</div>
            <div className = "blueT">Scheme</div>
          </div>
          <div className = "dash">
            <div className = "currentBooking hvr-grow">
              <div className = "currentBookText"><div className = "bookText">Current Booking</div></div>
            </div>

            <div className = "dashRow">
              
              <div className = "dashBtn newBook hvr-grow">
                <div className = "newBookText">Make a New Booking!</div>
                <img className = "cityB" src = {cityback}></img>
                
              </div>
              <div className = "dashBtn locateParking hvr-grow">
                <div className = "dashBtnText">Locate Parking</div>
                <div className = "dashBtnLogo"><img className = "locateLogo" src = {locateLogo} ></img></div>
              </div>
              <Link to = "/viewAllCars">
                <div className = 'dashBtn allCars hvr-grow'>
                  <div className = "dashBtnText">View All Cars</div>
                  <div className = "dashBtnLogo"><img className = "allCarsLogo" src = {allCars} ></img></div>
                </div>
              </Link>
              <div className = "dashBtn searchCar hvr-grow">
                <div className = "dashBtnText">Search for Car</div>
                <div className = "dashBtnLogo"><img className = "searchLogo" src = {searchLogo} ></img></div>
              </div>
              


            </div>
          </div>

          </div>
      </div>
    </ViewportProvider>
  );
}