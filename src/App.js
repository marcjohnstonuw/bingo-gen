import React, { Component } from 'react';
import {Link} from 'react-router';
import logo from './logo.svg';
import axios from 'axios';
import './App.css';

class App extends Component {
  constructor (props) {
    super(props);

    this.state = {};

    this.getAccessToken = this.getAccessToken.bind(this);
    this.getProfile = this.getProfile.bind(this);
    this.login = this.login.bind(this);
    this.logout = this.logout.bind(this);

  }
  getAccessToken() {
    const accessToken = localStorage.getItem('access_token');
    return accessToken;
  }

  getProfile(token) {
    let accessToken = token || this.getAccessToken();
    if (accessToken) {
      this.props.route.auth.auth0.client.userInfo(accessToken, (err, profile) => {
        if (profile) {
          this.setState({user: profile});
          axios.defaults.headers.common['Authorization'] = 'Bearer ' + accessToken;
          axios.post('/users/', profile);
        }
      });
    }
  }

  login() {
    this.props.route.auth.login();
  }

  logout() {
    this.props.route.auth.logout();
  }

  componentWillMount () {
    this.getProfile();
  }

  render() {
    let loginButton = this.props.route.auth.isAuthenticated() ?
              <li><button onClick={() => {this.logout()}}>Logout</button></li> :
              <li><button onClick={() => {this.login()}}>Login</button></li>;
    let userData = this.state.user ?
        <span>{this.state.user.email}</span> : '';
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Welcome to React</h2>
          <ul>
          <li><Link style={{color:'white'}} to="/GameTypes">Templates</Link></li>
          <li><Link style={{color:'white'}} to="/Boards">Boards</Link></li>
          { userData }
          { loginButton }
          </ul>
        </div>
        <p className="App-intro">
          {React.cloneElement(this.props.children, {getProfile: this.getProfile, auth: this.props.route.auth})}
        </p>
      </div>
    );
  }
}

export default App;
