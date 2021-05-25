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


import { ViewportProvider, WhichSideBar } from './ViewPort_Helper';

// const viewportContext = React.createContext({});

// const ViewportProvider = ({ children }) => {
//   const [width, setWidth] = React.useState(window.innerWidth);
//   const [height, setHeight] = React.useState(window.innerHeight);
//   const handleWindowResize = () => {
//     setWidth(window.innerWidth);
//     setHeight(window.innerHeight);
//   };

//   React.useEffect(() => {
//     window.addEventListener("resize", handleWindowResize);
//     return () => window.removeEventListener("resize", handleWindowResize);
//   }, []);

//   return (
//     <viewportContext.Provider value={{ width, height }}>
//       {children}
//     </viewportContext.Provider>
//   );
// };

// const useViewport = () => {
//   const { width, height } = React.useContext(viewportContext);
//   return { width, height };
// };

// const WhichSideBar = () => {
//   const { width } = useViewport();
//   const breakpoint = 1200;

//   return width < breakpoint ? <SideBarMobile /> : <SideBar />;
// };

export default function MakeBooking() {
  return (


    <div className="MakeBookingWrapper">
      <ViewportProvider>
        {/* // </ViewportProvider > */}
        <div className="ViewAllCarsWrapper">
          <WhichSideBar />
          <div className="viewAllCars">
            <div className="rowBooking">
              <div className="bookingTitle">Search</div>
              <div className="pageTitle">
                <div className="blueT">Car</div>
                <div className="yellowT">Share</div>
                <div className="blueT">Scheme</div>
              </div>
            </div>
            <div className="allCars">
              <div className='filterSection'>
                <div className="profileSignUpEmail">
                  {/* STYLE ERROR MESSAGE HERE */}
                  {/* {!found && !initial && < div > Couldn't find a car with entered ID </div>} */}
                  {/* STYLE TEXT BOX LABEL HERE */}
                  {/* <div className="profileLabel"> Search using the Registration ID of car.. </div> */}
                  {/* STYLE FORM HERE */}
                  {/* <form onSubmit={onSubmit}>

                  </form> */}
                </div>
              </div>
              <div className='displaySection'>


              </div>
            </div>
          </div>
        </div>
      </ViewportProvider >
    );
    </div>

  )
}