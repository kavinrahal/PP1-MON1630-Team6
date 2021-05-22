import React, { Component, useState } from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
} from "react-router-dom";

import './styles/ViewAllCars.css';
import SideBar from './SideBar';
import SideBarMobile from './SideBarMobile';
import CarDetailsElement from './CarDetailsElement';

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

export default function MakeBooking(){
    return(
        <div className = "MakeBookingWrapper">
        
        </div>

    )
}