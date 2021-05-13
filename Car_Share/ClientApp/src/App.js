
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";
import { Layout } from './components/Layout';
import { Home } from './components/Home';
import { FetchData } from './components/FetchData';
import { Counter } from './components/Counter';

import React, { Component } from 'react';
import './custom.css'
import LoginPage from './components/LoginPage';
import RegisterPage from './components/RegisterPage';
import Dashboard from "./components/Dashboard";


export default class App extends Component {
  static displayName = App.name;

  render () {
    return (
      <Router>
        <div className="App">
          <Switch>
            <Route path = "/" exact component = {LoginPage}></Route>
            <Route path = "/register" exact component = {RegisterPage}></Route>
            <Route path = "/viewAllCars" exact component = {{/*add view all cars page name here*/}}></Route>
            <Route path = "/dashboard" exact component = {Dashboard}></Route>
          </Switch>
        </div>
    </Router>
    );
  }
}
