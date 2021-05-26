import React, { Component, useState, useEffect } from 'react';
import DatePicker from "react-datepicker";

import moment from 'moment'
import "react-datepicker/dist/react-datepicker.css";
import './styles/ViewAllCars.css';

import { ViewportProvider, WhichSideBar } from './ViewPort_Helper';
import MakeBookingDisplayElement from './MakeBookingDisplayElement'
import MakeBookingSelect from './MakeBookingSelect';

export default function MakeBooking(props) {


  if (props.location.state) {
    console.log(props.location.state.id)
    console.log(props.location.state)

  }


  const [startDate, setStartDate] = useState(new Date())
  const [endDate, setEndDate] = useState(new Date());
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');
  const [maxEndTime, setMaxEndTime] = useState('');

  const [availableStartHours, setAvailableStartHours] = useState([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24]);
  const [availableEndHours, setAvailableEndHours] = useState([]);


  const [currentBooking, setCurrentBooking] = useState(
    {
      booking_id: 1,
      customer_id: 1,
      car_details: {
        car_id: 1,
        make: "Toyota",
        model: "Supra",
        body: "Coupe",
        colour: "Red"
      },
      start_time: '2021-05-27T5:00:00.000',
      end_time: '2021-05-27T10:00:00.000',
      price: 450,
      completed: 'in progress'
    },
    {
      booking_id: 2,
      customer_id: 2,
      car_details: {
        car_id: 1,
        make: "Toyota",
        model: "Supra",
        body: "Coupe",
        colour: "Red"
      },
      start_time: '2021-05-27T12:00:00.000',
      end_time: '2021-05-27T14:00:00.000',
      price: 450,
      completed: 'in progress'
    }
  )
  const [preBooked, setPreBooked] = useState([
    {
      id: 1,
      car_id: 1,
      booking_date: '26-05-2021',
      start_time: '13',
      end_time: '18',
    },
    {
      id: 1,
      car_id: 1,
      booking_date: '26-05-2021',
      start_time: '10',
      end_time: '12',
    },
  ])


  const handleStartDate = (date) => {
    setStartDate(date)
    setAvailableStartHours([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24])
    console.log('Before')

    console.log(availableEndHours)
    setAvailableEndHours([])
    console.log('After')

    console.log(availableEndHours)
  }

  const handleMinDate = (date) => {
    setEndDate(date)

    console.log('ENDDATE')
    console.log(endDate)
    var day = moment().format("LLL");
    console.log(moment('2021-05-26T23:00:00.000+05:30').format("LLL"))
    console.log(moment('2021-05-26T23:00:00.000+05:30').format("LL") == moment(endDate).format("LL"))
  }


  const handleStartTime = (e) => {
    setStartTime(e.target.value)
    setEndTime()
    setAvailableEndHours([])
  }

  // Check for Selected Start and End Date
  for (var i = 0; i < currentBooking.length; i++) {
    var booked_start = currentBooking[i].start_time
    console.log('booked_start')
    console.log(booked_start)

  }


  // // Check for Matching Bookings on selected date
  // for (var i = 0; i < preBooked.length; i++) {
  //   var pre_booked_dates = preBooked[i].booking_date
  //   var startDate_object = new Date(startDate)
  //   var startDate_moment = moment(startDate_object).format("DD-MM-YYYY")

  //   // if found, check already booked slots
  //   if (pre_booked_dates == startDate_moment) {
  //     for (var count = 0; count < availableStartHours.length; count++) {
  //       if (preBooked[i].start_time == count + 1) {
  //         var length = preBooked[i].end_time - preBooked[i].start_time
  //         // Delete Start time
  //         delete availableStartHours[count]
  //         // Delete Start time - 1
  //         delete availableStartHours[count - 1]
  //         // Loop to delete length of booking
  //         for (var j = 0; j < length; j++) {
  //           delete availableStartHours[count + j]
  //         }
  //       }
  //     }
  //   }
  // }


  if (startTime && !endTime) {
    console.log()
    for (var i = 0; i < availableStartHours.length; i++) {
      if (availableStartHours.includes(parseInt(startTime) + 1 + i)) {
        availableEndHours.push(parseInt(startTime) + 1 + i)
      }
      if (!availableStartHours.includes(parseInt(startTime) + 2 + i)) {
        break
      }
    }
  }


  const [carDetails, setCarDetails] = useState([
    {
      id: 1,
      rego: 'dummy_rego1',
      make: 'dummy_make1',
      model: 'dummy_model1',
      body: 'dummy_body1',
      colour: 'dummy_colour'
    },
    {
      id: 2,
      rego: 'dummy_rego2',
      make: 'dummy_make2',
      model: 'dummy_model2',
      body: 'dummy_body2',
      colour: 'dummy_colour1'
    },
    {
      id: 3,
      rego: 'dummy_rego3',
      make: 'dummy_make3',
      model: 'dummy_model3',
      body: 'dummy_body3',
      colour: 'dummy_colour'
    },
    {
      id: 4,
      rego: 'dummy_rego3',
      make: 'dummy_make3',
      model: 'dummy_model3',
      body: 'dummy_body3',
      colour: 'dummy_colour'
    },
    {
      id: 5,
      rego: 'dummy_rego2',
      make: 'dummy_make2',
      model: 'dummy_model2',
      body: 'dummy_body2',
      colour: 'dummy_colour1'
    },
  ])


  return (


    <div className="MakeBookingWrapper">
      <ViewportProvider>
        {/* // </ViewportProvider > */}
        <div className="ViewAllCarsWrapper">
          <WhichSideBar />
          <div className="viewAllCars">
            <div className="rowBooking">
              <div className="bookingTitle">Make a Booking</div>
              <div className="pageTitle">
                <div className="blueT">Car</div>
                <div className="yellowT">Share</div>
                <div className="blueT">Scheme</div>
              </div>
            </div>
            <div className="allCars">
              <div className='filterSection'>
                <MakeBookingDisplayElement key={carDetails[1].id} element={carDetails[1]} />
              </div>
              <div className='displaySection'>
                Availaibilty
                   {/* <MakeBookingSelect availHours={availableStartHours} onChange={() => test()} />)) */}
                <div>
                  <DatePicker selected={startDate} onChange={date => handleStartDate(date)} minDate={new Date()} />
                  <DatePicker selected={endDate} onChange={date => handleMinDate(date)} minDate={new Date()} />
                  <div>
                    <select className="start_time" onChange={(e) => handleStartTime(e)}>
                      <option value="" >Start Time</option>
                      {availableStartHours.map((start) => (
                        <option value={start} >{start}</option>
                      ))
                      }
                    </select>
                  </div>

                  {availableEndHours.length > 0 &&

                    <div>
                      <select className="start_time" onChange={(e) => setEndTime(e.target.value)}>
                        <option value="" >End Time</option>
                        {availableEndHours.map((end) => (
                          <option value={end} >{end}</option>
                        ))
                        }
                      </select>
                    </div>
                  }



                </div>
              </div>
            </div>
          </div>
        </div>
      </ViewportProvider >
    );
    </div >

  )
}