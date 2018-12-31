import React, { Component } from 'react'; 
import { Redirect, Link } from 'react-router-dom'; 
import axios from 'axios'; 

class LoginForm extends Component {
    constructor() {
        super(); 
        this.state = {
            username: '',
            password: '',
            redirectTo: null,
            messages: false
        }; 
        this.handleSubmit = this.handleSubmit.bind(this); 
        this.handleChange = this.handleChange.bind(this); 
  
    }

    handleChange(event) {
        this.setState({
            [event.target.name]: event.target.value
        }); 
    }

    handleSubmit(event) {
        event.preventDefault(); 
        axios
            .post('/auth/login', {
                username: this.state.username,
                password: this.state.password
            }, {withCredentials: true})
            .then(response => {
                if (response.status === 200) {
                    this.props.updateUser({
                        loggedIn: true,
                        username: response.data.username
                    }); 
                    this.setState({
                        redirectTo: '/map'
                    }); 
                }
            }).catch(error => {
                this.setState({
                  messages: true
                });                 
            }); 
    }

    render() {
        const messages = this.state.messages;
      if (this.state.redirectTo) {
           return <Redirect to={{ pathname: this.state.redirectTo }} />
        } else {
            return (
              <div> 
                <div class="row">
                <div class="col-md-12">
                <h4>Login</h4>
                </div>
                </div>
                <div class="row">
                <div class="col-md-12">
                {messages ? (
                  <p><strong>Invalid user information</strong></p>
                ) : null }
                </div>
                </div>
                <div class="row">
                <div class="col-md-12">
                <form >
                  <p><input className="form-input"
                    type="text"
                    id="username"
                    name="username"
                    placeholder="Username"
                    value={this.state.username}
                    onChange={this.handleChange} /></p>
                  <label className="form-label" htmlFor="username">Username</label>
                  <p><input className="form-input"
                    placeholder="Password"
                    type="password"
                    name="password"
                    value={this.state.password}
                    onChange={this.handleChange} /></p>
                  <label className="form-label" htmlFor="password">Password</label>                    
                  <p><button onClick={this.handleSubmit} type="submit">Login</button></p>
                </form>
                </div>
                </div>
                <div class="row">
                <div class="col-md-12">
                <Link class="App-link" to="/forgot">
                <span>Forgot password?</span>
				      </Link>
              </div>
              </div> 
              </div> 
            ); 
        }
    }
}

export default LoginForm; 