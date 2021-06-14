import React, { useEffect, useState } from 'react';
// import Geocode from "react-geocode";

export default function BookingHistoryElement( {element} ){

    const [carDetails, setCarDetails] = useState([]);
    const [address, setAddress] = useState('');
    var lat = '';
    var long = '';

    useEffect(() => {
        fetch("/api/car")
            .then(response => {
                if (response.ok) {
                    return response.json()
                }
                throw response
            })
            .then(data => {
                setCarDetails(data)
            })
            .catch(error => {
                console.log(error)
            })
    }, [])
    // console.log(element.startTime);
    // console.log(element.endTime);

    var rego_num = element.carID;
    var arrayLength = carDetails.length;
    for (var i = 0; i < arrayLength; i++) {
        if (carDetails[i].carID == rego_num) {
            lat = carDetails[i].location.lat;
            long = carDetails[i].location.lng;
    }
    }

    var geocoder  = new window.google.maps.Geocoder(); 
    var location  = new window.google.maps.LatLng(lat, long);   
    
    geocoder.geocode({'latLng': location}, function (results, status) 
    {
        if(status == window.google.maps.GeocoderStatus.OK) {
            setAddress(results[0].formatted_address); 
        }
    });

    const dateOneObj = new Date(element.startTime);
    const dateTwoObj = new Date(element.endTime);
    const milliseconds = Math.abs(dateTwoObj - dateOneObj);
    const hours = milliseconds / 36e5;
    var price = 0;

    if(hours <= 4){
        //for trips 4 hours or under. $20 per hour
        price = 20*hours;
    }
    else{
        //for trips more than 4 hours, same rate till 4 hours and $10 for each hour after
        price = 80 + (10*(hours - 4));
    }
    
    

    var options = { year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric' };
    let startdate = new Date(element.startTime).toLocaleDateString([], options);
    let enddate = new Date(element.endTime).toLocaleDateString([], options);
    return (
        <div>
            <div className='history_element'>
                <h3>Booking ID: {element.bookingID}</h3>
                <p> Start: {startdate}</p>
                <p>  End: {enddate},</p>
                <p>  Car ID: {element.carID}</p>
                <p>  Location: {address}</p>
                <p> Price of Trip: ${price}</p>
            </div>
        </div>

    )
}