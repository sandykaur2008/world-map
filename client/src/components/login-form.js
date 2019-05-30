import React, { Component } from 'react'; 
import { Redirect} from 'react-router-dom'; 
import axios from 'axios'; 
import MyMap from './map'; 

class LoginForm extends Component {
  constructor() {
    super(); 
    this.state = {
      username: '',
      password: '',
      redirectTo: null,
      messages: false,
    }; 
    this.mapRef = React.createRef();
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
    axios.post('/auth/login', {
      username: this.state.username,
      password: this.state.password
    }, {withCredentials: true})
      .then(response => {
        if (response.status === 200) {
          var uploadScreen = [];
          uploadScreen.push(<MyMap appContext={this.props.appContext} map={'map'} center={{ lat: 20, lng: -0.09 }} zoom={2} ref={this.mapRef} /> );
          this.props.appContext.setState({loginPage:[],uploadScreen:uploadScreen}); 
        }
      }).catch(error => {
        console.log(error); 
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
              <h4>Login</h4>
            </div>
          </div>
          <div class="row">
            <div class="messages col-md-12">
              {messages ? (
                <p><strong>Invalid user information</strong></p>
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
                <p><input className="form-input"
                  placeholder="Password"
                  type="password"
                  name="password"
                  value={this.state.password}
                  onChange={this.handleChange} /></p>                
                <p><button onClick={this.handleSubmit} type="submit">Login</button></p>
              </form>
            </div>
          </div>
        </div> 
      ); 
    }
  }
}

export default LoginForm; 