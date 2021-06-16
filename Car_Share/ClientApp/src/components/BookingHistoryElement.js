import React, { useEffect, useState } from 'react';
// import Geocode from "react-geocode";

export default function BookingHistoryElement( {element} ){
    var options = { year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric' };
    let startdate = new Date(element.startTime).toLocaleDateString([], options);
    let enddate = new Date(element.endTime).toLocaleDateString([], options);
    console.log(element);
    return (
        <div>
            <div className='history_element'>
                <h3>Booking ID: {element.bookingID}</h3>
                <p> Start: {startdate}</p>
                <p>  End: {enddate},</p>
                <p>  Car ID: {element.carID}</p>
                <p>  Pickup Location: {element.location}</p>
                <p> Price of Trip: ${element.cost}</p>
            </div>
        </div>

    )
}