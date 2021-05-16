import React, { Component, useState } from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
} from "react-router-dom";

import './styles/BookingHistory.css';
import BookingHistoryElement from './BookingHistoryElement';
import SideBar from './SideBar';
import SideBarMobile from './SideBarMobile';
import {Animated} from "react-animated-css";


function BookingHistory() {



    // Dummy date to populate history for now
    // TODO: Change to pull history using GET Request

    const [historys, setHistorys] = useState([
        {
            id: 1,
            date: 'dummy_date1',
            time: 'dummy_time1',
            location: 'dummy_location1',
            car_id: 'car1',
            status: 'completed'
        },
        {
            id: 2,
            date: 'dummy_date2',
            time: 'dummy_time2',
            location: 'dummy_location1',
            car_id: 'car2',
            status: 'completed'
        },
        {
            id: 3,
            date: 'dummy_date3',
            time: 'dummy_time3',
            location: 'dummy_location3',
            car_id: 'car3',
            status: 'completed'
        },
        {
            id: 4,
            date: 'dummy_date3',
            time: 'dummy_time3',
            location: 'dummy_location3',
            car_id: 'car3',
            status: 'completed'
        },
        {
            id: 5,
            date: 'dummy_date3',
            time: 'dummy_time3',
            location: 'dummy_location3',
            car_id: 'car3',
            status: 'completed'
        },
    ])

    // Keep track of filter selections
    const [location, setLocation] = useState(0)
    const [carId, setCarId] = useState(0)

    // uses 2nd array to display to keep original array clean 
    const [displayHistorys, setDisplayHistorys] = useState(historys)

    // Arrays to populate the filter <select>
    const populateLocation = [...new Set(historys.map(function (item) { return item["location"]; }))];
    const populateCar = [...new Set(historys.map(function (item) { return item["car_id"]; }))];

    // ascending/descending state
    const [sortDown, setSortDown] = useState(true)

    // TODO: change sort function by date
    const sort = () => {
        const copy = [...displayHistorys]
        if (sortDown) {
            copy.sort(function (a, b) {
                return b.id - a.id
            })
        } else {
            copy.sort(function (a, b) {
                return a.id - b.id
            })
        }
        setSortDown(!sortDown);
        setDisplayHistorys(copy);
    }

    // HANDLE FILTER 
    const onClick = () => {
        if (location != '' && carId != '') {
            setDisplayHistorys(historys.filter((history) => history.location == location && history.car_id == carId))
        } else if (location != '') {
            setDisplayHistorys(historys.filter((history) => history.location == location))
        } else if (carId != '') {
            setDisplayHistorys(historys.filter((history) => history.car_id == carId))
        } else {
            setDisplayHistorys(historys)
        }

    }

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

    return (
        <ViewportProvider>
        <div className='BookingHistoryWrapper'>
            <WhichSideBar />
            <div className = "bookingHistory">
                <div className = "rowBooking">
                    <div className = "bookingTitle">Booking History</div>
                    <div className = "pageTitle">
                        <div className = "blueT">Car</div>
                        <div className = "yellowT">Share</div>
                        <div className = "blueT">Scheme</div>
                    </div>
                </div>
                <div className = "booking">
                    <div className='filterSection'>
                        <button className = "orderBtn hvr-sweep-to-right" onClick={() => sort()}>Asc/Desc</button>
                        <select className = "filterLocation" onChange={(e) => setLocation(e.target.value)}>
                            <option value="" >Filter by Location</option>
                            {populateLocation.map((loc) => (
                                <option key={loc} value={loc} >{loc}</option>
                            ))
                            }
                        </select>
                        <select className = "filterCar" onChange={(e) => setCarId(e.target.value)}>
                            <option value="" >Filter by Car</option>
                            {populateCar.map((car) => (
                                <option key={car} value={car} >{car}</option>
                            ))
                            }
                        </select>
                        <button className = "filterBtn hvr-sweep-to-right" onClick={() => onClick()}>Filter</button>
                    </div>
                    <div className='displaySection'>
                        {displayHistorys.length > 0 ?
                            displayHistorys.map((history) => (
                                <BookingHistoryElement className='history_element' key={history.id} element={history} />))
                            : <h5 className='history_element' style={{ textAlign: 'center', background: '#f4f4f4'}} >No Available Slots found!</h5>
                        }

                    </div>
                </div>
            </div>
        </div>
        </ViewportProvider>
    )
}

export default BookingHistory;