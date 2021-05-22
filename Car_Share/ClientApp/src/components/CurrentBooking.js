import React, { Component, useState } from 'react';
import ReactDOM from 'react-dom';
import Countdown from 'react-countdown';

import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
} from "react-router-dom";

import './styles/CurrentBooking.css';
import SideBar from './SideBar';
import SideBarMobile from './SideBarMobile';

export default function CurrentBooking(){
    const [currentBooking, setCurrentBooking] = useState (
        {
            booking_id: 1,
            car_details: {
                car_id: 1,
                make: "Toyota",
                model: "Supra",
                body: "Coupe",
                colour: "Red"
            },
            start_time: '2021-05-22T18:30:00.000+05:30',
            end_time: '2021-05-22T23:59:00.000+05:30',
            price: 450,
        }
    )
    
    var startTime = currentBooking.start_time;
    var endTime = currentBooking.end_time;
    var stringStart = startTime.substr(11, 11);
    var stringEnd = endTime.substr(11, 11);
    var endDate = new Date(endTime); 
    var elapsed = endDate.getTime();
    var difference = elapsed - Date.now();


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

    const Completionist = () => <span className = "terminate">Please Return Car Now.</span>;

    const renderer = ({ hours, minutes, seconds, completed }) => {
        if (completed) {
        // Render a complete state
        return <Completionist />;
        } else {
        // Render a countdown
        return (
            <span className = "countDown">
                <div className = "inProgress">IN PROGRESS</div>
                {hours}:{minutes}:{seconds}
            </span>
        );
        }
    };

    return(
        <ViewportProvider>
            <div className = "CurrentBookingWrapper">
                <WhichSideBar/>
                <div className = "currentBooking">
                    <div className = "rowBooking">
                        <div className = "currentBookingTitle">Current Booking</div>
                        <div className = "pageTitle">
                            <div className = "whiteT">Car</div>
                            <div className = "yellowT">Share</div>
                            <div className = "whiteT">Scheme</div>
                        </div>
                    </div>
                    
                    <div className = "current">
                        <Countdown date={Date.now() + difference} renderer={renderer}/>
                        <div className = "bookingDetails">
                            <div className = "deets">
                                <div className = "bDetails">
                                    <div className = "bTitle">Booking Details</div>
                                    <div>Booking ID: {currentBooking.booking_id}</div>
                                    <div>Start Time: {stringStart}</div>
                                    <div>End Time: {stringEnd}</div>
                                    <div>Fair: ${currentBooking.price}</div>
                                </div>
                                <div className = "cDetails">
                                    <div className = "cTitle">Car Details</div>
                                    <div>Car ID: {currentBooking.car_details.car_id}</div>
                                    <div>Make: {currentBooking.car_details.make}</div>
                                    <div>Model: {currentBooking.car_details.model}</div>
                                    <div>Body: {currentBooking.car_details.body}</div>
                                    <div>Colour: {currentBooking.car_details.colour}</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </ViewportProvider>
    )
}