
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Layout } from './components/Layout';
import { Home } from './components/Home';
import { FetchData } from './components/FetchData';
import { Counter } from './components/Counter';

import React, { Component } from 'react';
import './custom.css'
import LoginPage from './components/LoginPage';
import RegisterPage from './components/RegisterPage';
import BookingHistory from "./components/BookingHistory";

export default class App extends Component {
  static displayName = App.name;

  render() {
    return (
      <Router>
        <div className="App">
          <Switch>
            <Route path="/" exact component={LoginPage}></Route>
            <Route path="/register" exact component={RegisterPage}></Route>
            <Route path="/booking_history" exact component={BookingHistory}></Route>


          </Switch>
        </div>
      </Router>
    );
  }
}
