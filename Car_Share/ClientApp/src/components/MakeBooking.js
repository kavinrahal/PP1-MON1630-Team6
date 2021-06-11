import React, { useState, useEffect } from 'react';
import DatePicker from "react-datepicker";
import { Link } from 'react-router-dom';
import moment from 'moment'
import "react-datepicker/dist/react-datepicker.css";
import './styles/MakeBooking.css';

import { ViewportProvider, WhichSideBar } from './ViewPort_Helper';
import MakeBookingDisplayElement from './MakeBookingDisplayElement'

export default function MakeBooking(props) {
  const [carDetails, setCarDetails] = useState([])

  useEffect(() => {
    if (props.location.state) {
      console.log(props.location.state.car)
      setCarDetails(props.location.state.car)
      setBookingHistories(props.location.state.car.bookings)
      setAvailableStartArray([])
    }
  }, [])

  const [datepickerStartDate, setDatepickerStartDate] = useState(new Date)
  const [datepickerEndDate, setDatepickerEndDate] = useState(new Date);
  const [selectBoxStartTime, setSelectBoxStartTime] = useState('');
  const [selectBoxEndTime, setSelectBoxEndTime] = useState('');

  const [startTimeToPost, setStartTimeToPost] = useState('');
  const [endTimeToPost, setEndTimeToPost] = useState('');

  const [availableStartArray, setAvailableStartArray] = useState([]);
  const [availableEndArray, setAvailableEndArray] = useState([]);

  const [dateError, setDateError] = useState(false);

  const [bookingHistories, setBookingHistories] = useState([])




  const handleDatepickerStart = (date) => {

    if (moment(date).isSameOrBefore(moment(datepickerEndDate))) {
      setDateError(false)
      setDatepickerStartDate(date)
    } else {
      setDatepickerStartDate(new Date)
      setDatepickerEndDate(new Date)
      setDateError(true)
      console.log("Hs")
    }
    setAvailableStartArray([])
    setAvailableEndArray([])
    setSelectBoxStartTime()
    setSelectBoxEndTime()
  }

  const handleDatepickerEnd = (date) => {
    console.log("END" + moment(date).format("LLL"))
    console.log(moment(datepickerStartDate).format("LLLL"))
    if (moment(date).isSameOrAfter(moment(datepickerStartDate))) {
      setDateError(false)
      setDatepickerEndDate(date)
    } else {
      console.log("H")
      setDatepickerStartDate(new Date)
      setDatepickerEndDate(new Date)
      setDateError(true)
    }
    setAvailableStartArray([])
    setAvailableEndArray([])
    setSelectBoxStartTime()
    setSelectBoxEndTime()
  }

  const handleSelectBoxStart = (e) => {
    setSelectBoxStartTime(e)
    setAvailableStartArray([])
    setAvailableEndArray([])
    setSelectBoxEndTime()
  }

  const handleSelectBoxEnd = (e) => {
    setSelectBoxEndTime(e)

    setStartTimeToPost(moment(selectBoxStartTime).format("YYYY-MM-DD[T]HH:mm:ss.sss"))
    setEndTimeToPost(moment(e).format("YYYY-MM-DD[T]HH:mm:ss.sss"))
    // console.log(moment(selectBoxStartTime).format("YYYY-MM-DD[T]HH:mm:ss.sss"))
    // console.log(e)


    setAvailableStartArray([])
    setAvailableEndArray([])
  }

  // ================ START OF AVAILABILITY ALGO =======================

  // Creates Initial 24 Available Hours to populate StartTime Select List
  if (datepickerStartDate) {
    for (var j = 0; j < 24; j++) {
      var option = moment(datepickerStartDate).hours(j).minutes('').format("LLL")
      availableStartArray.push(option)
    }
  }

  if (moment(datepickerStartDate).format("LL") == moment(datepickerEndDate).format("LL")) {
    // -- LOOP Through Booking Records --

    for (var i = 0; i < bookingHistories.length; i++) {
      // Match car ID
      // TODO

      // Match Dates
      // -- START select list var to moment objects --
      var datepickerStartDate_LL = moment(datepickerStartDate).format("LL")
      var historyStartDate_LL = moment(bookingHistories[i].startTime).format("LL")
      // -- END select list var to moment objects --
      var datepickerEndDate_LL = moment(datepickerEndDate).format("LL")
      var history_EndDate_LL = moment(bookingHistories[i].endTime).format("LL")
      // -- Database var to moment objects --
      var historyStartTime = moment(bookingHistories[i].startTime)
      var historyEndTime = moment(bookingHistories[i].endTime)

      // Check selecetd start date with Database to update Available times

      if (datepickerStartDate_LL == historyStartDate_LL) {
        // -- Getting Duration --
        var bookingLength_moment = moment.duration(historyEndTime.diff(historyStartTime))
        var bookingLength = bookingLength_moment.asHours()

        // -- Delete by Duration if same day booking --
        if (historyStartDate_LL == history_EndDate_LL) {
          for (var h = 0; h < bookingLength; h++) {
            var to_delete = moment(historyStartTime).add(h, 'hours').format("LLL")
            var index = availableStartArray.indexOf(to_delete)
            delete availableStartArray[index]
          }
          // -- Delete from Start of booking to end of the day if booking ends after --
        } else if (historyStartDate_LL != history_EndDate_LL) {
          for (var k = 0; k < availableStartArray.length; k++) {
            var to_delete = moment(historyStartTime).add(k, 'hours').format("LLL")
            var index = availableStartArray.indexOf(to_delete)
            delete availableStartArray[index]
          }
        }
        // -- Check if database booking ends on select day, delete from start of day to end of booking --
      } else if (datepickerStartDate_LL == history_EndDate_LL) {
        // -- Get Duration --
        var duration_moment = moment.duration(historyEndTime.diff(datepickerStartDate_LL))
        var duration = duration_moment.asHours()
        for (var j = 0; j < duration; j++) {
          var to_delete = moment(datepickerStartDate_LL).add(j, 'hours').format("LLL")
          var index = availableStartArray.indexOf(to_delete)
          // console.log(to_delete)
          delete availableStartArray[index]
        }
      }
    }
    if (selectBoxStartTime) {
      if (datepickerEndDate_LL == datepickerStartDate_LL) {
        for (var i = 0; i < availableStartArray.length; i++) {
          var a = moment(selectBoxStartTime).add((i + 1), 'hours')
          var b = a.format("LLL")
          if (availableStartArray.includes(b)) {
            availableEndArray.push(b)
            // console.log(selectBoxStartTime)
          }
          var c = moment(selectBoxStartTime).add((i + 2), 'hours')
          var d = a.format("LLL")
          if (!availableStartArray.includes(d)) {
            break
          }
        }
      }
    }
  } else if (moment(datepickerEndDate).format("LL") != moment(datepickerStartDate).format("LL") &&
    moment(datepickerEndDate).format("LL") > moment(datepickerStartDate).format("LL")) {
    // Search Records for Latest end time on Selected Start for Avail Start
    // and earliest Start time on Select End for Avail End
    var tmp_start = ''
    var datepickerStartDate_LL = moment(datepickerStartDate).format("LL")
    var datepickerEndDate_LL = moment(datepickerEndDate).format("LL")
    for (let index = 0; index < bookingHistories.length; index++) {
      var historyEndDate_LL = moment(bookingHistories[index].endTime).format("LL")
      if (datepickerStartDate_LL == historyEndDate_LL) {
        // If date matches .. compare time 
        // Save First Record of time, compare next few, if ends later, replace
        if (tmp_start == '') {
          tmp_start = bookingHistories[index].endTime
        } else if (bookingHistories[index].endTime > tmp_start) {
          tmp_start = bookingHistories[index].endTime
        }
      }
    }
    // Build Start Array
    // console.log(tmp_start)
    var tmp_time_HOUR = moment(tmp_start).format("HH")
    // console.log(tmp_time_HOUR)

    for (let index = tmp_time_HOUR - 1; index >= 0; index--) {
      // console.log(availableStartArray[index])
      delete availableStartArray[index]
    }

    // SET END TIME HERE
    var tmp_end = ''
    if (selectBoxStartTime) {
      for (let index = 0; index < bookingHistories.length; index++) {
        var historyStartDate_LL = moment(bookingHistories[index].startTime).format("LL")
        if (datepickerEndDate_LL == historyStartDate_LL) {
          if (tmp_end == '') {
            tmp_end = bookingHistories[index].startTime
            // console.log(tmp_end)
          } else { // check which smaller
            if (bookingHistories[index].startTime < tmp_end) {
              tmp_end = bookingHistories[index].startTime
              // console.log(tmp_end)
            }
          }
        }
      }
      // Build End Array
      var tmp_time_end_HOUR = moment(tmp_end).format("HH")
      console.log(tmp_time_end_HOUR)
      for (let index = 0; index < tmp_time_end_HOUR; index++) {
        var a = moment(datepickerEndDate_LL).add((index), 'hours')
        var b = a.format("LLL")
        availableEndArray.push(b)
      }
      if (tmp_end == "") {
        for (let index = 0; index < 24; index++) {
          var a = moment(datepickerEndDate_LL).add((index), 'hours')
          var b = a.format("LLL")
          availableEndArray.push(b)
        }
      }
    }
  }

  // ================ END OF AVAILABILITY ALGO =======================

  const onClick = async () => {
    if (selectBoxEndTime != '') {
      const booking = {
        customerID: sessionStorage.getItem("customerID"),
        carID: carDetails.carID,
        startTime: startTimeToPost,
        endTime: endTimeToPost,
        active: true,
      };

      // console.log(booking)
      // console.log(carDetails)
      const res = await fetch("https://carshare20210529215628.azurewebsites.net/api/booking", {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify(booking),
      })
        .then((response) => {
          if (response.ok) {
            alert("Booking has been placed Successfully!");


          }
        })
        .catch((error) => {

          console.log(error);
        });
    } else {
      //error
    }
  }


  return (
    <div className="MakeBookingWrapper">
      <ViewportProvider>
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
            <div className="makeBooking">
              <div className='makeBookingResult'>
                <MakeBookingDisplayElement key={carDetails.carID} element={carDetails} />
              </div>
              {dateError && <h4> Error: Start Date cannot be after End Date </h4>}
              <div className='makeBookingDisplay'>
                <div className = "avail">Availability</div>

                 {!props.location.state && 
                  <div className = "noCarSelect">
                    <div className = "noCar">No car selected! Choose one from</div>
                    <div className = "noCarBtn">
                      <Link to="/viewAllCars" className="noBtn">All Cars</Link>
                      <div className = "orBook">Or</div>
                      <Link to="/search_page" className="noBtn">Search For Car</Link>
                      <br></br>
                    </div>
                  </div>}

                {props.location.state &&
                  <div className = "chooseDate">
                    <div className = "datesss">
                      <div className = "dateText">Start</div>
                      <DatePicker className = "datePick filterLocation" selected={datepickerStartDate} value={datepickerStartDate} onChange={date => handleDatepickerStart(date)} minDate={new Date()} />
                      <div className = "dateText">End</div>
                      <DatePicker className = "datePick filterLocation" selected={datepickerEndDate} value={datepickerEndDate} onChange={date => handleDatepickerEnd(date)} minDate={new Date()} />
                    </div>

    
                    <div className = "timeSelect">
                      <div className = "timeStart">
                        <select className="startTime filterLocation" value={selectBoxStartTime} onChange={(e) => handleSelectBoxStart(e.target.value)}>
                          <option value="" >Start Time</option>
                          {availableStartArray.map((start) => (
                            <option value={start} >{start}</option>
                          ))
                          }
                        </select>
                      </div>

                      {availableEndArray.length > 0 &&
                        <div className = "timeStart">
                          <select className="endTime filterLocation" value={selectBoxEndTime} onChange={(e) => handleSelectBoxEnd(e.target.value)}>
                            <option value="" >End Time</option>
                            {availableEndArray.map((end) => (
                              <option value={end} >{end}</option>
                            ))
                            }
                            
                          </select>
                          <br></br>
                        </div>
                      }
                      

                      </div>
                      <button className = "bookkBtn hvr-sweep-to-right" onClick={() => onClick()}>Book Now</button>
                    </div>}

                    
                    
                  </div>
            </div>


          </div>
        </div>
      </ViewportProvider >

    </div >

  );
}
