'use strict'; 
import React, { Component } from 'react';  
import axios from 'axios'; 

class Home extends Component {
  constructor() {
    super();
    this.state = {
      comments: '',
      name: '',
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
      .post('/contact/', {
        comments: this.state.comments,
        name: this.state.name,
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
    return (
      <div>
        <p>Welcome to Sandy's Mapsite, where you can pin and save locations on a map of the world! Please 
          register and sign-in to access. If you have questions/comments, please submit below.</p>
        {messages ? (
         messages.map((message, index) =>
         <li key={index}>{message.msg}</li>) ) : null}
        <form >
          <label className="form-label" htmlFor="comments">Questions/Comments: </label>
          <textarea 
          name="comments"
            value={this.state.comments}
            onChange={this.handleChange}/>
          <label className="form-label" htmlFor="name">Name: </label>
            <input className="form-input"
              name="name"
              value={this.state.name}
              onChange={this.handleChange} />
          <label className="form-label" htmlFor="email">Email: </label>
            <input className="form-input"
              type="text"
              id="email"
              name="email"
              value={this.state.email}
              onChange={this.handleChange} />
          <button onClick={this.handleSubmit} type="submit">Submit</button>
        </form>      
      </div>
    ); 
  }
}

export default Home; 