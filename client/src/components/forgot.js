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
<<<<<<< HEAD
    axios.post('/auth/forgot', { email: this.state.email}, {withCredentials: true})
=======
    axios.post('/auth/forgot', { email: this.state.email }, {withCredentials: true})
>>>>>>> routing
      .then(response => {
        if (response.status === 200) {
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
        <div>
          <div class="row"> 
            <div class="col-md-12">
              <h4>Forgot</h4>
            </div>
          </div>
          <div class="row">
            <div class="col-md-12">
              <p>If you already requested a reset and were redirected here, your reset 
                link has expired. Please request another one below.</p>
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
                  id="email"
                  name="email"
                  placeholder="Email"
                  value={this.state.email}
                  onChange={this.handleChange} /></p>
                <label className="form-label" htmlFor="email">Email</label>
                <p><button onClick={this.handleSubmit} type="submit">Submit</button></p>
              </form>
            </div>
          </div>
        </div> 
      ); 
    }
  }
}

export default Forgot; 