import React, { Component } from 'react'; 
import { Redirect, withRouter } from 'react-router-dom'; 
import axios from 'axios'; 

class Reset extends Component {
  constructor() {
  super(); 
    this.state = {
      password: '',
      password2: '',  
      messages: null,
      redirectTo: null,
      resetToken: null
    }; 
    this.handleSubmit = this.handleSubmit.bind(this); 
    this.handleChange = this.handleChange.bind(this); 
  }

  componentDidMount() {
    let token = this.props.match.params.token; 
    axios.get(`/auth/reset/${token}`, {withCredentials: true})
      .then(response => {
        if (response.data.status === 0) {
          this.setState({
            redirectTo: '/forgot',
          });
        } else {
          this.setState({
            resetToken: response.data.resetToken
          }); 
        }
      });
  }

  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    }); 
  }

  handleSubmit(event) {
    event.preventDefault(); 
    axios.post(`/auth/reset/${this.state.resetToken}`, {
      password: this.state.password,
      password2: this.state.password2
    }, {withCredentials: true})
      .then(response => {
        if (response.data.status === 1) {
          this.setState({
            redirectTo: '/login',
          }); 
        } else if (response.data.status === 0) {
          this.setState({
            redirectTo: '/forgot',
          }); 
        } else {
          this.setState({
            messages: response.data.message
          }); 
        }
      }).catch(error => {
        this.setState({
          messages: true
        });                 
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
              <h4>Reset</h4>
            </div>
          </div>
          <div class="row">
            <div class="col-md-12">
              <p>Upon successful reset, you will be redirected to login page.</p>
            </div>
          </div>
          <div class="row">
            <div class="col-md-12">
              {messages ? (
                messages.map((message, index) =>
                  <p key={index}><strong>{message.msg}</strong></p>) 
              ) : null}
            </div>
          </div>
          <div class="row">
            <div class="col-md-12">
              <form >
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
                <p><button onClick={this.handleSubmit} type="submit">Submit</button></p>
              </form>
            </div>
          </div> 
        </div> 
      ); 
    }
  }
}

export default withRouter(Reset); 