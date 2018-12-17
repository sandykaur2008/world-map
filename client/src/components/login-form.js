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
        console.log('handleSubmit'); 

        axios
            .post('/auth/login', {
                username: this.state.username,
                password: this.state.password
            }, {withCredentials: true})
            .then(response => {
                console.log('login response: '); 
                console.log(response); 
                if (response.status === 200) {
                    // update App.js state
                    this.props.updateUser({
                        loggedIn: true,
                        username: response.data.username
                    }); 
                    // update the state to redirect to home
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
        var resetSuccess = this.props.messages;
        const messages = this.state.messages;
        if (this.state.redirectTo) {
            return <Redirect to={{ pathname: this.state.redirectTo }} />
        } else {
            return (
              <div className="login"> 
                <h4>Login</h4>
                {resetSuccess ? (
                  resetSuccess.map((message, index) =>
                  <li key={index}>{message.msg}</li>) ) : (<br></br>)}
                {messages ? (
                  <strong>Invalid user information</strong>
                ) : (<br></br>)}
                <form >
                  <label className="form-label" htmlFor="username">Username</label>
                  <input className="form-input"
                    type="text"
                    id="username"
                    name="username"
                    placeholder="Username"
                    value={this.state.username}
                    onChange={this.handleChange} />
                  <label className="form-label" htmlFor="password">Password: </label>
                  <input className="form-input"
                    placeholder="password"
                    type="password"
                    name="password"
                    value={this.state.password}
                    onChange={this.handleChange} />
                  <button onClick={this.handleSubmit} type="submit">Login</button>
                </form>
                <Link to="/forgot">
                <span>Forgot password?</span>
				      </Link>
              </div> 
            ); 
        }
    }
}

export default LoginForm; 