import React from 'react';
import './styles/MakeBooking.css';

const MakeBookingDisplayElement = ({ element }) => {
    return (
        <div className='bookingElement'>
            <h2>Details of Selected Car</h2>
            <div>License Plate:</div>
            <p>{element.rego}</p>
            <div>Make & Model:</div>
            <p>{element.make} {element.model}</p>
            <div>Colour:</div>
            <p>{element.colour}</p>
            <div>Body Type:</div>
            <p>{element.bodyType}</p>
        </div>

    )
}

export default MakeBookingDisplayElement