import React, { Component } from 'react'; 
import { Redirect } from 'react-router-dom'; 
import axios from 'axios'; 

class Register extends Component {
	constructor() {
		super(); 
		this.state = {
      username: '',
      email: '',
			password: '',
      password2: '',
      redirectTo: null,
      messages: null
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
      email: this.state.email,
      password: this.state.password,
      password2: this.state.password2,
		}, {withCredentials: true})
			.then(response => {
        console.log(response);
				if (response.data.status === 1) {
          console.log('successful signup'); 
					this.setState({ //redirect to login page
            redirectTo: '/login'
					}); 
				} else { this.setState({
          messages: response.data.message
        }); 
        }
			});
	}


  render() {
    const messages = this.state.messages; 
    if (this.state.redirectTo) {
      return <Redirect to={{ pathname: this.state.redirectTo }} />
    } else {
	  return (
		 <div className="SignupForm">
			 <h4>Sign up</h4>
       <p>Upon successful signup, you will be redirected to login page.</p>
       {messages ? (
         messages.map((message, index) =>
         <li key={index}>{message.msg}</li>) ) : null }
			 <form>
				 <label className="form-label" htmlFor="username">Username</label>
				 <input className="form-input"
					 type="text"
					 id="username"
					 name="username"
					 placeholder="Username"
					 value={this.state.username}
					 onChange={this.handleChange} />
         <label className="form-label" htmlFor="email">Email</label>
				 <input className="form-input"
					 type="text"
					 id="email"
					 name="email"
					 placeholder="Email"
					 value={this.state.email}
					 onChange={this.handleChange} />
				 <label className="form-label" htmlFor="password">Password: </label>
				 <input className="form-input"
					  placeholder="password"
					  type="password"
					  name="password"
					  value={this.state.password}
					  onChange={this.handleChange} />
         <label className="form-label" htmlFor="password2">Confirm Password: </label>
         <input className="form-input"
            placeholder="password"
            type="password"
            name="password2"
            value={this.state.password2}
            onChange={this.handleChange} />
				 <button onClick={this.handleSubmit} type="submit">Sign up</button>
			 </form>
		 </div>
   ); 
  }
 }
}

export default Register;