import React, { Component } from 'react';  
import Register from './register';
import LoginForm from './login-form';

class Home extends Component {
  constructor() {
    super();
    this.state = {
      username:'',
      password:'',
      loginscreen:[],
      buttonLabel:'Register',
      isLogin:true
    };
    this.handleClick = this.handleClick.bind(this); 
  }

  componentWillMount(){
    var loginscreen=[];
    loginscreen.push(<LoginForm parentContext={this} appContext={this.props.parentContext}/>);
    this.setState({
                  loginscreen:loginscreen,
                    })
  }

  handleClick(){
    if(this.state.isLogin){
      var loginscreen=[];
      loginscreen.push(<Register parentContext={this}/>);
      this.setState({
                     loginscreen:loginscreen,
                     buttonLabel:"Login",
                     isLogin:false
                   })
    }
    else{
      var loginscreen=[];
      loginscreen.push(<LoginForm parentContext={this}/>);
      this.setState({
                     loginscreen:loginscreen,
                     buttonLabel:"Register",
                     isLogin:true
                   })
    }
  }

  render() {
    return (
      <div>
      <header class='App-header'>           
        <div class='container'> 
          <button onClick={this.handleClick} class="blue" type="button">{this.state.buttonLabel}</button>
        </div>
      </header>
      <main className="loginscreen container">
        <div class="row">
          <div class="col-md-12">
            <p className='header'>Welcome to "Sandy's Mapsite", where you can pin and save locations 
            on a map of the world! Please login to access.</p>
          </div>
        </div>
        <div>
          {this.state.loginscreen}
        </div>
      </main>
      </div>
    ); 
  }
}

export default Home; 