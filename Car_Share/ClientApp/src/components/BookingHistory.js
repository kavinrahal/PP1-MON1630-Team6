import React, { Component, useState } from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
} from "react-router-dom";

import './styles/BookingHistory.css'
import BookingHistoryElement from './BookingHistoryElement'


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

    return (
        <div className='BookingHistoryWrapper'>
            {/* <div className='NavBar'>
                NAV BAR
            </div> */}

            <div className='header'>
                <h1 >Booking History</h1>
            </div>

            <div className='filterSection'>
                <button onClick={() => sort()}>Asc/Desc</button>
                {/* <select onChange={(e) => setOrder(e.target.value)}>
                    <option value="">Filter by Order</option>
                    <option value='1'>Ascending</option>
                    <option value='0'>Descending</option>
                </select> */}

                <select onChange={(e) => setLocation(e.target.value)}>
                    <option value="" >Filter by Location</option>
                    {populateLocation.map((loc) => (
                        <option key={loc} value={loc} >{loc}</option>
                    ))
                    }
                </select>

                <select onChange={(e) => setCarId(e.target.value)}>
                    <option value="" >Filter by Car</option>
                    {populateCar.map((car) => (
                        <option key={car} value={car} >{car}</option>
                    ))
                    }
                </select>

                <button onClick={() => onClick()}>go</button>
            </div>

            <div className='displaySection'>
                {displayHistorys.length > 0 ?
                    displayHistorys.map((history) => (
                        <BookingHistoryElement className='history_element' key={history.id} element={history} />))
                    : <h5 className='history_element' style={{ textAlign: 'center' }} >No Available Slots found!</h5>
                }

            </div>
            {/* // temporary back to login,  should return back to dashboard */}
            <div className="alreadyLog"><Link to="/">previous page</Link></div>
        </div >
    )
}

export default BookingHistory;