import React, { useState, useEffect } from 'react';
import Countdown from 'react-countdown';
import './styles/CurrentBooking.css';
import { Link, useHistory } from 'react-router-dom';
import { ViewportProvider, WhichSideBar } from './ViewPort_Helper';

export default function CurrentBooking() {
    const history = useHistory();
    const [currentBooking, setCurrentBooking] = useState([])
    const [loading, setLoading] = useState(true)
    const [notYetStart, setNotYetStart] = useState(false)

    useEffect(() => {
        // Fetch data for current booking
        async function fetchData() {
            var booking_exist = false;
            const res = await fetch("/api/booking", {
                headers: {
                    ApiKey: 'CarShareRmit'
                }
            })
            const data = await res.json();
            // console.log(data)

            for (let i = 0; i < data.length; i++) {
                if (data[i].customerID == sessionStorage.getItem('customerID')) {
                    if (data[i].active == true) {
                        booking_exist = true;
                        // console.log(data[i])
                        // setBookingExist(booking_exist)
                        setCurrentBooking(data[i])
                        // setStartTime(data[i].startTime)
                        // setEndTime(data[i].endTime)            
                    }
                }
                // console.log(currentBooking);
            }
            setLoading(false)
        }
        fetchData();

    }, [])

    const Completionist = () => <span className="terminate">Please Return Car Now.</span>;

    const [hideResults, setHideResults] = React.useState(true);

    if (!loading && currentBooking != '') {
        var startTime = currentBooking.startTime;
        var endTime = currentBooking.endTime;
        var stringStart = startTime.substr(11, 11);
        var stringEnd = endTime.substr(11, 11);
        var endDate = new Date(endTime);
        var elapsed = endDate.getTime();
        var difference = elapsed - Date.now();

        var startt = new Date(startTime);
        if (startt > Date.now()) {
            setNotYetStart(true)
        }

    }

    // If booking is not yet, show count to next booking
    // Cancel button if before booking, return button if during and after booking
    // active = false , if return if cancel delete booking object from backend
    const onCancel = async () => {
        const res = await fetch("/api/booking/" + currentBooking.bookingID, {
            method: "DELETE",
            headers: {
                "Content-type": "application/json",
                ApiKey: 'CarShareRmit'
            }
        })
        if (res.ok) {
            alert("Booking successfully canceled")
            history.push({
                pathname: '/dashboard',

            });

        }

    }
    const onReturn = async () => {
        var booking_put = {
            bookingID: currentBooking.bookingID,
            customerID: currentBooking.customerID,
            carID: currentBooking.carID,
            active: false
        }
        booking_put.active = false;
        const res = await fetch("/api/booking/" + currentBooking.bookingID, {
            method: "PUT",
            headers: {
                "Content-type": "application/json",
                ApiKey: "CarShareRmit"
            },
            body: JSON.stringify(booking_put)
        })
        if (res.ok) {
            alert("Booking successfully returned")
            history.push({
                pathname: '/dashboard',

            });
        }
    }

    const renderer = ({ hours, minutes, seconds, completed }) => {
        if (completed) {
            setHideResults(true);
            // Render a complete state
            return <Completionist />;
        } else {
            // Render a countdown
            return (
                <span className="countDown">
                    <div className="inProgress">IN PROGRESS</div>
                    {hours}:{minutes}:{seconds}
                </span>
            );
        }
    };

    return (
        <ViewportProvider>
            <div className="CurrentBookingWrapper">
                <WhichSideBar />
                <div className="currentBooking">
                    <div className="rowBooking">
                        <div className="currentBookingTitle">Current Booking</div>
                        <div className="pageTitle">
                            <div className="whiteT">Car</div>
                            <div className="yellowT">Share</div>
                            <div className="whiteT">Scheme</div>
                        </div>
                    </div>

                    <div className="current">
                        {loading
                            ? <div className="loadingCurr" > Loading... </div>
                            :
                            <div className="countdown"><Countdown date={Date.now() + difference} renderer={renderer} /></div>
                        }

                        <div className="bookingDetails">

                            {currentBooking != '' && !loading ?
                                <div className="currBooking">
                                    <div className="currDetails">
                                        <div className="deets">
                                            <div className="bDetails hvr-grow">
                                                <div className="bTitle">Booking Details</div>
                                                <div className="bDeet">Booking ID: {currentBooking.bookingID}</div>
                                                <div className="bDeet">Start Time: {stringStart}</div>
                                                <div className="bDeet">End Time: {stringEnd}</div>
                                                <div className="bDeet">Fair: ${currentBooking.amount}</div>
                                            </div>
                                            <div className="cDetails hvr-grow">
                                                <div className="cTitle">Car Details</div>
                                                <div className="bDeet">Car ID: {currentBooking.carID}</div>
                                                <div className="bDeet">Make: {currentBooking.car.make}</div>
                                                <div className="bDeet">Model: {currentBooking.car.model}</div>
                                                <div className="bDeet">Body: {currentBooking.car.bodyType}</div>
                                                <div className="bDeet">Colour: {currentBooking.car.colour}</div>
                                            </div>
                                        </div>

                                        <div className="currButtons">
                                            {notYetStart && <div className="buttonCont">

                                                {hideResults ? <button onClick={() => onCancel()} className="cancelCurrentBooking hvr-sweep-to-right-red">CANCEL BOOKING</button> : null}

                                            </div>}
                                            {!notYetStart &&
                                                <div className="buttonCont">
                                                    {hideResults ? <button onClick={() => onReturn()} className="cancelCurrentBooking hvr-sweep-to-right-red">RETURN BOOKING</button> : null}
                                                </div>}
                                        </div>
                                    </div>

                                </div>

                                : !loading &&
                                <div className="noCarSelect">
                                    <h2>No Current Booking Made!</h2>
                                    <div className="noCarBtn">
                                        <Link to="/viewAllCars" className="noBtn">All Cars</Link>
                                        <div className="orBook">Or</div>
                                        <Link to="/search_page" className="noBtn">Search For Car</Link>
                                        <br></br>
                                    </div>
                                </div>}
                        </div>
                    </div>
                </div>
            </div>
        </ViewportProvider>
    )
}