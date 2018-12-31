import React, { Component } from 'react'; 
import { Link } from 'react-router-dom'; 
import axios from 'axios'; 

class Navbar extends Component {
  constructor() {
    super(); 
    this.state = {
      redirectTo: null
    }; 
    this.logout = this.logout.bind(this); 
  }

  logout(event) {
    event.preventDefault(); 
    axios.post('/auth/logout', {withCredentials: true})
      .then(response => {
        if (response.status === 200) {
          this.props.updateUser({
            loggedIn: false,
            username: null
          }); 
        }
      }).catch(error => {
        console.log(error); 
      }); 
  }

  render() {
    const loggedIn = this.props.loggedIn;    
    return (
      <header class="App-header">
        <div class="container"> 
          {loggedIn ? (
            <section>
              <Link class="App-link" to="/" >
                <span >Home</span>
              </Link>
              <Link class="App-link" to="#" onClick={this.logout}>
                <span>Logout</span>
              </Link>
              <Link class="App-link" to="/map">
                <span>Map</span>
              </Link>
            </section>
          ) : (
            <section>
              <Link class="App-link" to="/">
                <span>Home</span>
              </Link>
              <Link class="App-link" to="/login">
                <span>Login</span>
				      </Link>
              <Link class="App-link" to="/register">
                <span>Register</span>
				      </Link>
            </section>
          )}
        </div>
        <br></br>
      </header>
    );
  }
}

export default Navbar; 