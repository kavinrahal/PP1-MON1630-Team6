import React, { useEffect, useState } from 'react';
import './styles/BookingHistory.css';
import BookingHistoryElement from './BookingHistoryElement';
import { ViewportProvider, WhichSideBar } from './ViewPort_Helper';

function BookingHistory() {

    const [historys, setHistorys] = useState([])
    const [loading, setLoading] = useState(true)
    // const [historys, setHistorys] = useState([{
    //     active: false,
    //     bookingID: 7,
    //     carID: 2,
    //     customerID: 1,
    //     endTime: "2021-04-27T12:00:00",
    //     startTime: "2021-04-27T00:00:00",
    //     location: "s"
    // },
    // {
    //     active: false,
    //     bookingID: 3,
    //     carID: 3,
    //     customerID: 1,
    //     endTime: "2021-02-27T12:00:00",
    //     startTime: "2021-02-27T00:00:00",
    //     location: "s"
    // },
    // {
    //     active: false,
    //     bookingID: 1,
    //     carID: 4,
    //     customerID: 1,
    //     endTime: "2021-01-27T12:00:00",
    //     startTime: "2021-01-27T00:00:00",
    //     location: "a"
    // },
    // {
    //     active: false,
    //     bookingID: 2,
    //     carID: 2,
    //     customerID: 1,
    //     endTime: "2020-05-27T12:00:00",
    //     startTime: "2021-05-27T00:00:00",
    //     location: "s"
    // }
    // ])
    useEffect(() => {
        fetch("https://localhost:5001/api/booking")
            .then(response => {
                if (response.ok) {
                    return response.json()
                }
                throw response
            })
            .then(data => {
                let tmp = []
                for (let index = 0; index < data.length; index++) {
                    // if (data[index].customerID == sessionStorage.getItem('customerID')) {
                    if (data[index].customerID == 1) {
                        if (data[index].active == true) {
                            tmp.push(data[index])
                        }
                    }
                }
                for (let index = 0; index < tmp.length; index++) {
                }
                setHistorys(tmp)
                setDisplayHistorys(tmp)
            })
            .catch(error => {
                console.log(error)
            }).finally(() => {
                setLoading(false)
            })

    }, [])

    // Keep track of filter selections
    const [locationFilter, setLocationFilter] = useState(0)
    const [carFilter, setCarFilter] = useState(0)

    // uses 2nd array to display to keep original array clean 
    const [displayHistorys, setDisplayHistorys] = useState(historys)

    // Arrays to populate the filter <select>
    const populateLocation = [...new Set(historys.map(function (item) { return item["location"]; }))];
    const populateCar = [...new Set(historys.map(function (item) { return item["carID"]; }))];

    // ascending/descending state
    const [sortDown, setSortDown] = useState(true)

    const handleFilter = (carIDFilter) => {
        if (carIDFilter != "") {
            setCarFilter(carIDFilter)
            let copy = [...historys]
            setDisplayHistorys(copy.filter((history) => history.carID == carIDFilter))
        }
    }

    const handleLocationFilter = (locationFilter) => {
        if (locationFilter != "") {
            setLocationFilter(locationFilter)
            let copy = [...historys]
            setDisplayHistorys(historys.filter((history) => history.location == locationFilter))
        }
    }

    // Sorts by Start Date
    const sort = () => {
        const copy = [...displayHistorys]
        var len = copy.length;
        if (sortDown) {
            for (var i = len - 1; i >= 0; i--) {
                for (var j = 1; j <= i; j++) {
                    if (copy[j - 1].startTime > copy[j].startTime) {
                        var temp = copy[j - 1];
                        copy[j - 1] = copy[j];
                        copy[j] = temp;
                    }
                }
            }
        }
        else {
            for (var i = len - 1; i >= 0; i--) {
                for (var j = 1; j <= i; j++) {
                    if (copy[j - 1].startTime < copy[j].startTime) {
                        var temp = copy[j - 1];
                        copy[j - 1] = copy[j];
                        copy[j] = temp;
                    }
                }
            }

        }
        setSortDown(!sortDown);
        setDisplayHistorys(copy);
    }

    // HANDLE FILTER 
    const onClick = () => {
        setLocationFilter("")
        setCarFilter("")
        setDisplayHistorys(historys)
    }

    return (
        <ViewportProvider>
            <div className='BookingHistoryWrapper'>
                <WhichSideBar />
                <div className="bookingHistory">
                    <div className="rowBooking">
                        <div className="bookingTitle">Booking History</div>
                        <div className="pageTitle">
                            <div className="blueT">Car</div>
                            <div className="yellowT">Share</div>
                            <div className="blueT">Scheme</div>
                        </div>
                    </div>
                    <div className="booking">
                        <div className='filterSection'>
                            <button className="orderBtn hvr-sweep-to-right" onClick={() => sort()}>Asc/Desc</button>
                            <select className="filterLocation" value={locationFilter} onChange={(e) => handleLocationFilter(e.target.value)}>
                                {/* <select className="filterLocation" onChange={(e) => handleFilter(e.target.value)}> */}
                                <option value="" >Filter by Location</option>
                                {populateLocation.map((loc) => (
                                    <option key={loc} value={loc} >{loc}</option>
                                ))
                                }
                            </select>
                            {/* <select className="filterCar" onChange={(e) => setCarFilter(e.target.value)}> */}
                            <select className="filterCar" value={carFilter} onChange={(e) => handleFilter(e.target.value)}>
                                <option value="" >Filter by Car</option>
                                {populateCar.map((car) => (
                                    <option key={car} value={car} >{car}</option>
                                ))
                                }
                            </select>
                            <button className="filterBtn hvr-sweep-to-right" onClick={() => onClick()}>Clear Filters</button>
                        </div>

                        {loading && <div className='history_element'><h4 style={{ textAlign: "center" }}>loading</h4></div>}

                        {!loading &&
                            <div className='displaySection'>
                                {displayHistorys.length > 0 ?
                                    displayHistorys.map((history) => (
                                        <BookingHistoryElement className='history_element' key={history.bookingID} element={history} />))
                                    : <h5 className='history_element' style={{ textAlign: 'center', background: '#f4f4f4' }} >No Available Slots found!</h5>
                                }

                            </div>}
                    </div>
                </div>
            </div>
        </ViewportProvider >
    )
}

export default BookingHistory;