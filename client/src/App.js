import React, { Component } from 'react';
import Home from './components/home'; 
import './App.css';

class App extends Component {
  constructor() {
    super();
    this.state = {
      loginPage: [], 
      uploadScreen: [],
    }; 
    this.componentWillMount = this.componentWillMount.bind(this); 
  }

  componentWillMount(){
    var loginPage =[];
    loginPage.push(<Home parentContext={this}/>);
    this.setState({
                  loginPage:loginPage
                    })
  }

  render() {
    return (
      <div className='App'>
          {this.state.loginPage}
          {this.state.uploadScreen}
      </div>
    );
  }
}

export default App;