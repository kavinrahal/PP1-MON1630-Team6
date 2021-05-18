import React from 'react';

const CatDetailsElement = ({ element }) => {
    return (
        <div className='carDetails_element'>
            <h3>Car ID: {element.id}</h3>
            <p>{element.make} ,  {element.model} , {element.body}, {element.colour}</p>
        </div>

    )
}

export default CatDetailsElement;