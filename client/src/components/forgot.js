import React, { Component, getDerivedStateFromProps } from 'react'; 
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
        const messages = this.state.messages;
        if (this.state.redirectTo) {
            return <Redirect to={{ pathname: this.state.redirectTo }} />
        } else {
            return (
              <div className="forgot"> 
                <h4>Forgot</h4>
                <p>If you already requested a reset and were redirected here, your reset link has expired. Please request another one below.</p>
                {messages ? (
                  messages.map((message, index) =>
                  <li key={index}>{message.msg}</li>) ) : null }
                <form >
                  <label className="form-label" htmlFor="email">Email</label>
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