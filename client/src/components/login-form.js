import React, { Component } from 'react'; 
import { Redirect } from 'react-router-dom'; 
import axios from 'axios'; 

class LoginForm extends Component {
    constructor() {
        super(); 
        this.state = {
            username: '',
            password: '',
            redirectTo: null
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
                        redirectTo: '/'
                    }); 
                }
            }).catch(error => {
                console.log('login error: '); 
                console.log(error);
                
            }); 
    }

    render() {
        if (this.state.redirectTo) {
            return <Redirect to={{ pathname: this.state.redirectTo }} />
        } else {
            return (
              <div className="login"> 
                <h4>Login</h4>
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
              </div> 
            ); 
        }
    }
}

export default LoginForm; 