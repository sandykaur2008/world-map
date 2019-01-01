import React, { Component } from 'react';
import axios from 'axios'; 
import {Route, Redirect, Switch} from 'react-router-dom'; 
import Register from './components/register';
import LoginForm from './components/login-form';
import Navbar from './components/navbar';
import MyMap from './components/map'; 
import Forgot from './components/forgot';
import Reset from './components/reset'; 
import Home from './components/home'; 
import NoMatch from './components/nomatch'; 
import './App.css';

class App extends Component {
  constructor() {
    super();
    this.state = {
      loggedIn: false, 
      username: null,
      messages: null,
      map: null, 
    }; 
    this.mapRef = React.createRef();
    this.getUser = this.getUser.bind(this); 
    this.componentDidMount = this.componentDidMount.bind(this); 
    this.updateUser = this.updateUser.bind(this); 
  }

  componentDidMount() {
    this.getUser(); 
  }

  updateUser (userObject) {
    this.setState(userObject); 
  }

  getUser() {
    axios.get('/auth/getuser', {withCredentials: true}).then(response => {
      if (response.data.user) {
        this.setState({
          loggedIn: true,
          username: response.data.user.username,
          map: 'map'
        }); 
      } else {
        this.setState({
          loggedIn: false,
          username: null,
          map: null
        }); 
      }
    }); 
  }

  render() {
    return (
      <div>
        <Navbar updateUser={this.updateUser} loggedIn={this.state.loggedIn} />
        <Switch>
          <Route exact path="/" component={Home} />
          <Route
            exact path="/login"
            render={() =>
              this.state.loggedIn ? ( 
                <Redirect to='/map' /> 
              ) : ( 
              <LoginForm updateUser={this.updateUser}  /> ) } />
          <Route
            exact path="/map"
            render={() =>
              this.state.loggedIn ? (
                <MyMap
                  map={this.state.map} center={{ lat: 20, lng: -0.09 }} zoom={2} ref={this.mapRef} /> 
              ) : ( <Redirect to='/'/> ) } /> 
          <Route
            exact path="/register"
            render={() =>
              this.state.loggedIn ? ( <Redirect to='/map' /> ) : ( <Register />)} />
          <Route
            exact path="/forgot"
            render={() =>
              this.state.loggedIn ? ( <Redirect to='/map' /> ) : ( <Forgot /> )} />
          <Route
            exact path="/reset/:token"
            render={() =>
              this.state.loggedIn ? ( <NoMatch/> ) : ( <Reset />)} />
          <Route component={NoMatch}/>
        </Switch>
      </div>
    );
  }
}

export default App;