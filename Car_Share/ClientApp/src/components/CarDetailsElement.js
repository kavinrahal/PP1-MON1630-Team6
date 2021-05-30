import React from 'react';
import { useHistory } from "react-router-dom";
const CatDetailsElement = ({ element }) => {
    const history = useHistory();
    const onClick = () => {
        history.push({
            pathname: '/make_booking',
            state: {  // location state
                car: element,
            },
        });

    }
    return (
        <div className='carDetails_element'>
            <h3>Car ID: {element.carID}</h3>
            <p>License Plate: {element.rego}</p>
            <p>Make and Model: {element.make} {element.model}</p>
            <p>Color : {element.colour}</p>
            <p>Car Type : {element.bodyType}</p>

            <button className = "carBookk hvr-sweep-to-right" onClick={() => onClick()}>Book here</button>
        </div>

    )
}

export default CatDetailsElement;