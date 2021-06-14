import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ViewportProvider, WhichSideBar } from './ViewPort_Helper';
import BookingHistoryElement from './BookingHistoryElement';

export default function BookingReceipt(props){
    const [bookingDetails, setBookingDetails] = useState([])

    useEffect(() => {
        if (props.location.state) {
          console.log(props.location.state.booking);
          console.log("dis works");
          setBookingDetails(props.location.state.booking);
        }
    }, [])


    return(
        <div>
            <BookingHistoryElement className='history_element' key={bookingDetails.bookingID} element={bookingDetails}></BookingHistoryElement>
        </div>
    );
}