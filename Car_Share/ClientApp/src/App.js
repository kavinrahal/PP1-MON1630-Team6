
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
            <Route path = "/" exact component = {Dashboard}></Route>
            <Route path = "/register" exact component = {RegisterPage}></Route>
          
          
          </Switch>
        </div>
    </Router>
    );
  }
}
