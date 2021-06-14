
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import React, { Component } from 'react';
import './custom.css'
import LoginPage from './components/LoginPage';
import RegisterPage from './components/RegisterPage';
import Dashboard from "./components/Dashboard";
import Profile from "./components/Profile";
import BookingHistory from "./components/BookingHistory";
import ViewAllCars from "./components/ViewAllCars";
import CurrentBooking from "./components/CurrentBooking";
import MakeBooking from "./components/MakeBooking";
import SearchPage from "./components/SearchPage";
import Settings from "./components/Settings";
import PrivateRoute from './PrivateRoute'
import geolocation from './components/geolocation';
import BookingReceipt from "./components/BookingReceipt";

export default class App extends Component {
  static displayName = App.name;

  render() {
    return (
      <Router>
        <div className="App">
          <Switch>
            <Route path="/" exact component={LoginPage}></Route>
            <Route path="/register" exact component={RegisterPage}></Route>
            {/* <Route path="/dashboard" exact component={Dashboard}></Route> */}
            <PrivateRoute path="/dashboard" component={Dashboard} />
            <PrivateRoute path="/profile" exact component={Profile} />
            <PrivateRoute path="/booking_history" exact component={BookingHistory} />
            <PrivateRoute path="/viewAllCars" exact component={ViewAllCars} />
            <PrivateRoute path="/currentBooking" exact component={CurrentBooking} />
            <PrivateRoute path="/make_booking" exact component={MakeBooking} />
            <PrivateRoute path="/search_page" exact component={SearchPage} />
            <PrivateRoute path = "/settings" exact component = {Settings}/>
            <PrivateRoute path = "/locate" exact component = {geolocation}/>
            <PrivateRoute path = "/booking_receipt" exact component = {BookingReceipt}/>
          </Switch>
        </div>
      </Router>
    );
  }
}
