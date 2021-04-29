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
import BackDrop from '../addons/Circle bg.svg';
import allCars from '../addons/AllCarsLogo.svg';

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
  const breakpoint = 1024;

  return width < breakpoint ? <SideBarMobile /> : <SideBar />;
};

export default function Dashboard() {
  return (
    <ViewportProvider>
      <div className = "dashboardWrapper">
        <WhichSideBar />
        <div className = "dashboard">
          <div className = "row1 dashTitle">
            <div className = "blueT">Car</div>
            <div className = "yellowT">Share</div>
            <div className = "blueT">Scheme</div>
          </div>
          <div className = "dash">
            <div className = "currentBooking">
              <div className = "currentBookText">Current Booking</div>
            </div>

            <div className = "dashRow">
              <div className = 'allCars'>
                <div className = "allCarsText">View All Cars</div>
                <div className = "allCarsLogo"><img src = {allCars} ></img></div>
              </div>
            </div>
          </div>

          </div>
      </div>
    </ViewportProvider>
  );
}