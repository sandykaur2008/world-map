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
		event.preventDefault(); 
		axios.post('/auth/getuser', {
      username: this.state.username,
      email: this.state.email,
      password: this.state.password,
      password2: this.state.password2,
		}, {withCredentials: true})
			.then(response => {
				if (response.data.status === 1) {
					this.setState({ 
            redirectTo: '/login'
					}); 
				} else { 
          this.setState({
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
		  <div>
        <div class="row">
          <div class="col-md-12">
			      <h4>Sign up</h4>
          </div>
        </div> 
        <div class="row">
          <div class="col-md-12">
            <p>Upon successful signup, you will be redirected to login page.</p>
          </div>
        </div>
        <div class="row">
          <div class="col-md-12">
            {messages ? (
              messages.map((message, index) =>
                <p key={index}><strong>{message.msg}</strong></p>) 
              ) : null }
          </div>
        </div>
        <div class="row">
          <div class="col-md-12">
			      <form>
				      <p><input className="form-input"
					      type="text"
					      id="username"
					      name="username"
					      placeholder="Username"
					      value={this.state.username}
					      onChange={this.handleChange} /></p>
              <label className="form-label" htmlFor="username">Username</label>
				      <p><input className="form-input"
					      type="text"
					      id="email"
					      name="email"
					      placeholder="Email"
					      value={this.state.email}
					      onChange={this.handleChange} /></p>
              <label className="form-label" htmlFor="email">Email</label>           
				      <p><input className="form-input"
					      placeholder="Password"
					      type="password"
					      name="password"
					      value={this.state.password}
					      onChange={this.handleChange} /></p>
				      <label className="form-label" htmlFor="password">Password</label>            
              <p><input className="form-input"
                placeholder="Confirm Password"
                type="password"
                name="password2"
                value={this.state.password2}
                onChange={this.handleChange} /></p>
              <label className="form-label" htmlFor="password2">Confirm Password</label>
				      <p><button onClick={this.handleSubmit} type="submit">Sign up</button></p>
			      </form>
          </div>
       </div>
		 </div>
   ); 
  }
 }
}

export default Register;