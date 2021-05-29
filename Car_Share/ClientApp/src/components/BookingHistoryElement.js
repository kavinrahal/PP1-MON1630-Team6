import React from 'react';

const BookingHistoryElement = ({ element }) => {

    var options = { year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric' };
    let startdate = new Date(element.startTime).toLocaleDateString([], options);
    let enddate = new Date(element.endTime).toLocaleDateString([], options);
    return (
        <div className='history_element'>
            <h3>Booking ID: {element.bookingID}</h3>
            <p> Start: {startdate}</p>
            <p>  End: {enddate},</p>
            <p>  Car: {element.carID}, Location: {element.location},</p>
        </div>

    )
}

export default BookingHistoryElement