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

  const [startDate, setStartDate] = useState(new Date)
  const [endDate, setEndDate] = useState(new Date);
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');


  const [availableStartHours, setAvailableStartHours] = useState([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24]);
  const [availStart, setAvailStart] = useState([]);
  const [availableEndHours, setAvailableEndHours] = useState([]);

  const [currentBooking, setCurrentBooking] = useState([
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
      start_time: '2021-05-27T00:00:00.000',
      end_time: '2021-05-27T06:00:00.000',
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
    },
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
      start_time: '2021-05-27T22:00:00.000',
      end_time: '2021-05-28T10:00:00.000',
      price: 450,
      completed: 'in progress'
    },
  ])
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



  const handleStartDate = (sdate) => {
    setStartDate(sdate)

    setAvailStart([])
    setStartTime()
    setEndTime()
  }

  const handleEndDate = (edate) => {
    setEndDate(edate)
    setAvailStart([])
    setStartTime()
    setEndTime('')
    console.log('endTime')
    console.log(endTime)
  }

  const handleStartTime = (e) => {
    setStartTime(e.target.value)

    setAvailStart([])
    setAvailableEndHours([])
    setEndTime()
  }

  const handleEndTime = (e) => {
    setEndTime(e.target.value)

    setAvailStart([])
    setAvailableEndHours([])
    setEndTime()
  }

  // Creates Initial 24 Available Hours to populate StartTime Select List
  if (startDate) {
    for (var j = 0; j < 24; j++) {
      var option = moment(startDate).hours(j).minutes('').format("LLL")
      availStart.push(option)
    }
  }

  // User Select Dates
  // Search Pre Booked for all car ID 
  // Match car ID
  // Check for get avail base on date and time
  for (var i = 0; i < currentBooking.length; i++) {
    // Match car ID
    // TODO
    // Match Dates

    // -- START select list var to moment objects --
    var startDate_moment = moment(startDate).format("LL")
    var bookedStartDate_moment = moment(currentBooking[i].start_time).format("LL")
    // -- END select list var to moment objects --
    var endDate_moment = moment(endDate).format("LL")
    var bookedEndDate_moment = moment(currentBooking[i].end_time).format("LL")
    // -- Database var to moment objects --
    var bookedStartTime_moment = moment(currentBooking[i].start_time)
    var bookedEndTime_moment = moment(currentBooking[i].end_time)

    // Check selecetd start date with Database to update Available times
    if (startDate_moment == bookedStartDate_moment) {
      // -- Getting Duration --
      var bookingLength_moment = moment.duration(bookedEndTime_moment.diff(bookedStartTime_moment))
      var bookingLength = bookingLength_moment.asHours()

      // -- Delete by Duration if same day booking --
      if (bookedStartDate_moment == bookedEndDate_moment) {
        for (var h = 0; h < bookingLength; h++) {
          var to_delete = moment(bookedStartTime_moment).add(h, 'hours').format("LLL")
          var index = availStart.indexOf(to_delete)
          delete availStart[index]
        }
        // -- Delete from Start of booking to end of the day if booking ends after --
      } else if (bookedStartDate_moment != bookedEndDate_moment) {
        for (var k = 0; k < availStart.length; k++) {
          var to_delete = moment(bookedStartTime_moment).add(k, 'hours').format("LLL")
          var index = availStart.indexOf(to_delete)
          delete availStart[index]
        }
      }
      // -- Check if database booking ends on select day, delete from start of day to end of booking --
    } else if (startDate_moment == bookedEndDate_moment) {
      // -- Get Duration --
      var duration_moment = moment.duration(bookedEndTime_moment.diff(startDate_moment))
      var duration = duration_moment.asHours()
      for (var j = 0; j < duration; j++) {
        var to_delete = moment(startDate_moment).add(j, 'hours').format("LLL")
        var index = availStart.indexOf(to_delete)
        console.log(to_delete)
        delete availStart[index]
      }
    }

    // -- Check for End Times --
    if (endDate_moment) { }

    // if (startDate_moment == bookedStartDate_moment && endDate_moment == bookedEndDate_moment) {
    //   // Remove them from Available
    //   console.log("Called start")
    //   console.log(startDate_moment)
    //   console.log(bookedStartDate_moment)
    //   console.log(endDate_moment)
    //   console.log(bookedEndDate_moment)
    //   var bookingLength_moment = moment.duration(bookedEndTime_moment.diff(bookedStartTime_moment))
    //   var bookingLength = bookingLength_moment.asHours()

    //   // for (var o = bookingLength - 1; o >= 0; o--) {
    //   //   console.log(bookedStartTime_moment.format("LLL"))
    //   //   var index = availStart.indexOf(bookedStartTime_moment.format("LLL"))
    //   //   console.log(availStart[index + o])
    //   //   delete availStart[index + o]
    //   //   // availStart.splice(index + o, 1)
    //   //   console.log(availStart.length)
    //   // }

    //   while (bookingLength >= 0) {
    //     var index = availStart.indexOf(bookedStartTime_moment.format("LLL"))
    //     // console.log(availStart[index + bookingLength - 1])
    //     // availStart.splice((index + bookingLength - 1), 1)
    //     // console.log(availStart.length)
    //     delete availStart[index + bookingLength - 1]
    //     console.log("deleted " + availStart[index + bookingLength - 1])
    //     // index--
    //     bookingLength--
    //   }
    // }
    // // If only start date matched, means Booking was made the whole day so delete rest of list
    // if (startDate_moment == bookedStartDate_moment && startDate_moment != bookedEndDate_moment) {
    //   console.log("Called mid")
    //   console.log(startDate_moment)
    //   console.log(currentBooking[i])
    //   console.log(bookedStartDate_moment)
    //   console.log(endDate_moment)
    //   console.log(bookedEndDate_moment)
    //   var index = availStart.indexOf(bookedStartTime_moment.format("LLL"))
    //   for (var k = 0; k < availStart.length; k++) {
    //     delete availStart[index + k - 1]
    //   }
    // }
    // // If only END date matched, means Booking was made previous day to end now therefore will only start after
    // if (startDate_moment != bookedStartDate_moment && startDate_moment == bookedEndDate_moment) {
    //   console.log("Called end")
    //   console.log(startDate_moment)
    //   console.log(bookedStartDate_moment)
    //   console.log(endDate_moment)
    //   console.log(bookedEndDate_moment)
    //   var index = availStart.indexOf(bookedEndTime_moment.format("LLL"))
    //   for (var k = 0; k < availStart.length; k++) {
    //     console.log("deleted " + availStart[index - k - 1])
    //     delete availStart[index - k - 1]
    //   }
    // }

  }


  if (startTime && !endTime) {
    if (endDate_moment == startDate_moment) {
      for (var i = 0; i < availStart.length; i++) {
        var a = moment(startTime).add((i + 1), 'hours')
        var b = a.format("LLL")
        if (availStart.includes(b)) {
          availableEndHours.push(b)
          console.log(startTime)
        }
        var c = moment(startTime).add((i + 2), 'hours')
        var d = a.format("LLL")
        if (!availStart.includes(d)) {
          break
        }
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

  console.log(availStart)
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
                <div>
                  Start
                  <DatePicker selected={startDate} onChange={sdate => handleStartDate(sdate)} minDate={new Date()} />
                  End
                  <DatePicker selected={endDate} onChange={edate => handleEndDate(edate)} minDate={new Date()} />
                  <div>
                    <select className="start_time" onChange={(e) => handleStartTime(e)}>
                      <option value="" >Start Time</option>
                      {availStart.map((start) => (
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