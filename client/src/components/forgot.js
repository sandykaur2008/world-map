import React, { Component } from 'react'; 
import { Redirect } from 'react-router-dom'; 
import axios from 'axios'; 

class Forgot extends Component {
    constructor() {
        super(); 
        this.state = {
            email: '',
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
        console.log('handleSubmit'); 

        axios
            .post('/auth/forgot', {
                email: this.state.email
            }, {withCredentials: true})
            .then(response => {
                if (response.status === 200) {
                    // update App.js state
                    this.setState({
                        messages: response.data.message
                    }); 
                } else {
                  this.setState({
                    messages: response.data.message
                  }); 
                }
            }).catch(error => {
                console.log(error);                
            }); 
    }

    render() {
        const resetError = this.props.messages;
        const messages = this.state.messages;
        if (this.state.redirectTo) {
            return <Redirect to={{ pathname: this.state.redirectTo }} />
        } else {
            return (
              <div className="forgot"> 
                <h4>Forgot</h4>
                {resetError ? (
                  resetError.map((message, index) =>
                  <li key={index}>{message.msg}</li>) ) : (<br></br>)}
                {messages ? (
                  messages.map((message, index) =>
                  <li key={index}>{message.msg}</li>) ) : (<br></br>)}
                <form >
                  <label className="form-label" htmlFor="username">Email</label>
                  <input className="form-input"
                    type="text"
                    id="email"
                    name="email"
                    placeholder="Email"
                    value={this.state.email}
                    onChange={this.handleChange} />
                  <button onClick={this.handleSubmit} type="submit">Submit</button>
                </form>
              </div> 
            ); 
        }
    }
}

export default Forgot; 