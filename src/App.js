import React, { Component } from 'react';
import logo from './logo.svg';
import lastfm, {methods}  from './api/last_fm'
import './App.css';

class App extends Component {
  componentWillMount() {
    console.log(lastfm.get({ method: methods.USER_GET_LOVED_TRACKS, params: { user: 'sashatobin' }}));
    console.log(lastfm.get({ method: methods.USER_GET_TOP_ARTISTS, params: { user: 'sashatobin' }}));
  }

  render() {
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo"/>
          <h2>Welcome to React</h2>
        </div>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
      </div>
    );
  }
}

export default App;
