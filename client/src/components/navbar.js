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
        console.log('logging out'); 
        axios.post('/auth/logout', {withCredentials: true}).then(response => {
          console.log(response.data); 
          if (response.status === 200) {
            this.props.updateUser({
              loggedIn: false,
              username: null
            }); 
          }
        }).catch(error => {
            console.log('Logout error'); 
        }); 
      }

    render() {
        const loggedIn = this.props.loggedIn;
        console.log('navbar render, props: '); 
        console.log(this.props);
        
        return (
        <header>
          {loggedIn ? (
            <section>
              <Link to="#" onClick={this.logout}>
              <span>logout</span></Link>
            </section>
          ) : (
            <section>
              <Link to="/">
                <span>home</span>
              </Link>
              <Link to="/login">
                <span>login</span>
				      </Link>
              <Link to="/register">
              <span>Register</span>
				      </Link>
            </section>
          )}
        </header>
        );
    }
}

export default Navbar; 