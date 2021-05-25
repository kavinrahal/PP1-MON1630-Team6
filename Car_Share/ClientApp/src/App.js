
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


export default class App extends Component {
  static displayName = App.name;

  render() {
    return (
      <Router>
        <div className="App">
          <Switch>
            <Route path="/" exact component={LoginPage}></Route>
            <Route path="/register" exact component={RegisterPage}></Route>
            <Route path="/dashboard" exact component={Dashboard}></Route>
            <Route path="/profile" exact component={Profile}></Route>
            <Route path="/booking_history" exact component={BookingHistory}></Route>
            <Route path="/viewAllCars" exact component={ViewAllCars}></Route>
            <Route path="/currentBooking" exact component={CurrentBooking}></Route>
            <Route path="/make_booking" exact component={MakeBooking}></Route>
            <Route path="/search_page" exact component={SearchPage}></Route>
          </Switch>
        </div>
      </Router>
    );
  }
}
