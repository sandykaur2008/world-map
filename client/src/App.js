import React, { Component } from 'react';
import axios from 'axios'; 
import {Route} from 'react-router-dom'; 
import Register from './components/register';
import LoginForm from './components/login-form';
import Navbar from './components/navbar';
import Map from './components/map'; 
import Forgot from './components/forgot';
import Reset from './components/reset'; 
import Home from './components/home'; 


class App extends Component {
  constructor() {
    super();
    this.state = {
      loggedIn: false, 
      username: null,
      messages: null,
      map: null
    }; 

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
    axios.get('/auth/', {withCredentials: true}).then(response => {
      console.log('Get user response: '); 
      console.log(response.data); 
      if (response.data.user) {
        console.log('Get User: There is a user saved in the server session: '); 

        this.setState({
          loggedIn: true,
          username: response.data.user.username,
          map: 'map'
        }); 
      } else {
        console.log('Get user: no user');
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
      <div className="App">
   
        <Navbar updateUser={this.updateUser} loggedIn={this.state.loggedIn} />
        {/* greet user if logged in: */}
        {this.state.loggedIn &&
          <p>Join the party, {this.state.username}!</p>
        }
        {/* Routes to different components */}
        <Route
          exact path="/"
          component={Home} />
        <Route
          path="/login"
          render={() =>
            <LoginForm
              updateUser={this.updateUser} messages={this.state.messages}
            />}
        />
        {this.state.loggedIn &&
        <Route
          exact path="/map"
          render={() =>
            <Map
            updateUser={this.updateUser} loggedIn={this.state.loggedIn} map={this.state.map}
            />}
         />}
        <Route
          path="/register"
          render={() =>
            <Register/>}
        />
        <Route
          path="/forgot"
          render={() =>
            <Forgot
            updateUser={this.updateUser} messages={this.state.messages}
            />}
        />
        <Route
          path="/reset/:token"
          render={() =>
            <Reset
            updateUser={this.updateUser} 
            />}
        />
      
      </div>
    );
  }
}

export default App;
