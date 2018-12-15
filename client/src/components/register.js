import React, { Component } from 'react'; 
import axios from 'axios'; 

class Register extends Component {
	constructor() {
		super(); 
		this.state = {
			username: '',
			password: '',
			confirmPassword: '',
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
		console.log('sign-up handleSubmit, username: '); 
		console.log(this.state.username); 
		event.preventDefault(); 
		//request to server to add a new username/password
		axios.post('/auth/', {
			username: this.state.username,
			password: this.state.password
		}, {
      headers: {
        'CSRF-Token': this.props.csrf}
    })
			.then(response => {
				console.log(response)
				if (!response.data.error) {
					console.log('successful signup'); 
					this.setState({ //redirect to login page
            redirectTo: '/login',
            csrf: response.data.csrf 
					}); 
				} else {
          console.log('username already taken'); 
          this.setState({ 
            csrf: response.data.csrf 
					}); 
				}
			}).catch(error => {
				console.log('signup error: '); 
				console.log(error); 

			}); 
	}


  render() {
	  return (
		 <div className="SignupForm">
			 <h4>Sign up</h4>
			 <form>
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
				 <button onClick={this.handleSubmit} type="submit">Sign up</button>
			 </form>
		 </div>
	 ); 
 }
}

export default Register;