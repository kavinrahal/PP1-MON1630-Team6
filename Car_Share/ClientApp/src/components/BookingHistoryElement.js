import React from 'react';

const BookingHistoryElement = ({ element }) => {
    return (
        <div className='history_element'>
            <h3>Booking ID: {element.id}</h3>
            <p>{element.date} ,  {element.time} , {element.location}, {element.car_id}</p>
        </div>

    )
}

export default BookingHistoryElement