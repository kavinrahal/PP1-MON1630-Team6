import React from 'react';
import './styles/MakeBooking.css';

const MakeBookingDisplayElement = ({ element }) => {
    return (
        <div className='bookingElement'>
            <div className = "makeBTitle">Details of Selected Car</div>
            <div>License Plate:</div>
            <div className = "elementEl">{element.rego}</div>
            <div>Make & Model:</div>
            <div className = "elementEl">{element.make} {element.model}</div>
            <div>Colour:</div>
            <div className = "elementEl">{element.colour}</div>
            <div>Body Type:</div>
            <div className = "elementEl">{element.bodyType}</div>
        </div>

    )
}

export default MakeBookingDisplayElement