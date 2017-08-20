import React, { Component } from 'react';
import {Link} from 'react-router';
import logo from './logo.svg';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Welcome to React</h2>
          <ul>
          <li><Link style={{color:'white'}} to="/GameTypes">Templates</Link></li>
          <li><Link style={{color:'white'}} to="/Boards">Boards</Link></li>
          </ul>
        </div>
        <p className="App-intro">
          {this.props.children}
        </p>
      </div>
    );
  }
}

export default App;
