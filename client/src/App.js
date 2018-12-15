import React, { Component } from 'react';
import axios from 'axios'; 
import {Route, Link} from 'react-router-dom'; 
import Register from './components/register';
import LoginForm from './components/login-form';
import Navbar from './components/navbar';
import Home from './components/home'; 


class App extends Component {
  constructor() {
    super();
    this.state = {
      loggedIn: false, 
      username: null,
      csrf: null
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
    axios.get('/auth/').then(response => {
      console.log('Get user response: '); 
      console.log(response.data); 
      if (response.data.user) {
        console.log('Get User: There is a user saved in the server session: '); 

        this.setState({
          loggedIn: true,
          username: response.data.user.username,
          csrf: response.data.csrf
        }); 
      } else {
        console.log('Get user: no user');
        this.setState({
          loggedIn: false,
          username: null,
          csrf: response.data.csrf
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
              updateUser={this.updateUser}
            />}
        />
        <Route
          path="/register"
          render={() =>
            <Register/>}
        />

      </div>
    );
  }
}

export default App;
