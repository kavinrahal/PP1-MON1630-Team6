import React from 'react';

const MakeBookingDisplayElement = ({ element }) => {
    return (
        <div className='history_element'>

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