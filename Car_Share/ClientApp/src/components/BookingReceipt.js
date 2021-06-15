import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ViewportProvider, WhichSideBar } from './ViewPort_Helper';
import BookingHistoryElement from './BookingHistoryElement';
// import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import PaypalExpressBtn from 'react-paypal-express-checkout';

export default function BookingReceipt(props){

    const [bookingDetails, setBookingDetails] = useState([]);

        useEffect(() => {
            if (props.location.state) {
            console.log(props.location.state.booking);
            setBookingDetails(props.location.state.booking);
            }
        }, []);


		const onSuccess = async(payment) => {
            	console.log("Payment successful!", payment);
                const res = await fetch("/api/booking", {
                    method: "POST",
                    headers: {
                      "Content-type": "application/json",
                    },
                    body: JSON.stringify(bookingDetails),
                  })
                    .then((response) => {
                      if (response.ok) {
                        alert("Booking has been placed Successfully!");
                      }
                    })
                    .catch((error) => {
            
                      console.log(error);
                    });
		}

		const onCancel = (data) => {
			// The user pressed "cancel" or closed the PayPal popup
			console.log('Payment cancelled!', data);
		}

		const onError = (err) => {
			// The main Paypal script could not be loaded or something blocked the script from loading
			console.log("Error!", err);
		}

		let env = 'sandbox';
		let currency = 'AUD';
		let total = bookingDetails.cost;  // this is the total amount to charge

		const client = {
			sandbox:    'AZW__BJSOkDYLgbREOxhZt-VAWbHwIqu6iayHvB_fNwvYBCZx8nEgTtfIgbXVw3aRH6lBV-DMQlnUDyG',
            production: '',
		}
    return(
        <div>
            <BookingHistoryElement className='history_element' key={bookingDetails.bookingID} element={bookingDetails}></BookingHistoryElement>
            <PaypalExpressBtn env={env} client={client} currency={currency} total={total} onError={onError} onSuccess={onSuccess} onCancel={onCancel} />
        </div>
    );
}