import React, { useState, useEffect } from 'react';
import { ViewportProvider, WhichSideBar } from './ViewPort_Helper';
import { useHistory } from "react-router";
import BookingHistoryElement from './BookingHistoryElement';
import PaypalExpressBtn from 'react-paypal-express-checkout';
import './styles/BookingReceipt.css';

export default function BookingReceipt(props) {

    const history = useHistory();

    const [bookingDetails, setBookingDetails] = useState([]);

    useEffect(() => {
        if (props.location.state) {
            console.log(props.location.state.booking);
            setBookingDetails(props.location.state.booking);
        }
    }, []);


    const onSuccess = async (payment) => {
        console.log("Payment successful!", payment);
        const res = await fetch("/api/booking", {
            method: "POST",
            headers: {
                "Content-type": "application/json",
                ApiKey: "CarShareRmit"
            },
            body: JSON.stringify(bookingDetails),
        })
            .then((response) => {
                if (response.ok) {
                    alert("Booking has been placed Successfully!");
                    history.push({
                        pathname: '/dashboard',
                    });
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
    let total = bookingDetails.amount;  // this is the total amount to charge

    const client = {
        sandbox: 'AZW__BJSOkDYLgbREOxhZt-VAWbHwIqu6iayHvB_fNwvYBCZx8nEgTtfIgbXVw3aRH6lBV-DMQlnUDyG',
        production: '',
    }

    const style = {
        size: 'medium',
        color: 'gold',
        shape: 'pill',
        label: 'paypal'
    }


    return (
        <ViewportProvider>
            <div className="BookingReceiptWrapper">
                <WhichSideBar />
                <div className="bookingReceipt">
                    <div className="rowBooking">
                        <div className="bookingReceiptTitle">Booking Summary</div>
                        <div className="pageTitle">
                            <div className="blueT">Car</div>
                            <div className="yellowT">Share</div>
                            <div className="blueT">Scheme</div>
                        </div>
                    </div>
                    <div className="receipt">
                        <BookingHistoryElement className='history_element' key={bookingDetails.bookingID} element={bookingDetails}></BookingHistoryElement>
                        <div className="receiptQuoteTitle">Cost Summary</div>
                        <div className="receiptQuote">1 - 4 hours: $20/hour</div>
                        <div className="receiptQuote">4+ hours: $20/hour till 4 hours, $10/hour for every hour after</div>
                        <br></br>
                        <div className="receiptQuoteCenter">Click the button below to continue to your payment through PayPal!</div>
                        <div className="paypalBtn">
                            <PaypalExpressBtn className="paypalEx" env={env} client={client} currency={currency} total={total} onError={onError} onSuccess={onSuccess} onCancel={onCancel} style={style} />
                        </div>
                    </div>
                </div>
            </div>
        </ViewportProvider>
    );
}