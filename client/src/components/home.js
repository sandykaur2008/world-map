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
        <div class="row">
        <div class="col-md-12">
        <p>Welcome to Sandy's Mapsite, where you can pin and save locations on a map of the world! Please 
          register and sign-in to access. If you have questions/comments, please submit below.</p>
        </div>
        </div>
        <div class="row">
        <div class="col-md-12">
        {messages ? (
         messages.map((message, index) =>
         <p key={index}><strong>{message.msg}</strong></p>) ) : null}
         </div>
         </div> 
         <div class="row">
         <div class="col-md-12">
        <form >
          <p><textarea 
          rows="10" cols="30"
          name="comments"
            value={this.state.comments}
            placeholder="Questions/Comments"
            onChange={this.handleChange}/></p>
          <label className="form-label" htmlFor="comments">Questions/Comments</label>
          <p><input className="form-input"
              placeholder="Name"
              name="name"
              value={this.state.name}
              onChange={this.handleChange} /></p>
          <label className="form-label" htmlFor="name">Name</label>
          <p><input className="form-input"
              placeholder="Email"
              type="text"
              id="email"
              name="email"
              value={this.state.email}
              onChange={this.handleChange} /></p>
          <label className="form-label" htmlFor="email">Email</label>
          <p><button onClick={this.handleSubmit} type="submit">Submit</button></p>
        </form>    
        </div>
        </div>  
      </div>
    ); }
}

export default Home; 