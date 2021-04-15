
import { Route } from 'react-router';
import { Layout } from './components/Layout';
import { Home } from './components/Home';
import { FetchData } from './components/FetchData';
import { Counter } from './components/Counter';

import React, { Component } from 'react';
import './custom.css'
import LoginPage from './components/LoginPage';

export default class App extends Component {
  static displayName = App.name;

  render () {
    return (
      <LoginPage></LoginPage>
    );
  }
}
