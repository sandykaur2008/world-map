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
      <Switch>
        <Route
          exact path="/"
          render={() => 
            <Home/>
          }
           />
        <Route
          exact path="/login"
          render={() =>
            this.state.loggedIn ? ( <Redirect to='/map' /> ) : 
           ( <LoginForm
              updateUser={this.updateUser}  /> ) }
        />
                <Route
               exact path="/map"
                render={() =>
                  this.state.loggedIn ? (
                  <MyMap
                  loggedIn={this.state.loggedIn} map={this.state.map} center={{ lat: 51.505, lng: -0.09 }} zoom={13} ref={this.mapRef}
                  /> ) : ( <Redirect to='/'/> ) }
               /> 


        <Route
          exact path="/register"
          render={() =>
            this.state.loggedIn ? ( <Redirect to='/map' /> ) :
           ( <Register />)}
        />
        <Route
         exact path="/forgot"
          render={() =>
            this.state.loggedIn ? ( <Redirect to='/map' /> ) : 
           ( <Forgot /> )}
        />
        <Route
         exact path="/reset/:token"
          render={() =>
            this.state.loggedIn ? ( <NoMatch/> ) :
           ( <Reset />)}
        />
        <Route component={NoMatch}/>
      </Switch>
      
      </div>
    );
  }
}

export default App;