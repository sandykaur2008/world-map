import React, { Component } from 'react';
import axios from "axios"; 
import './App.css';


class App extends Component {
  constructor() {
    super();
    this.state = {
      message: null
    }; 
    this.componentDidMount = this.componentDidMount.bind(this); 
  }

  // Fetch passwords after first mount
  componentDidMount() {
    this.getPasswords();
  }

  getPasswords() {
    // Get the passwords and store them in state
    axios.get('/api/passwords')
      .then(response => this.setState({ message: response.data.message }));
  }

  render() {

    return (
      <div className="App">
        {/* Render the passwords if we have them */}
          <div>
            <h1>5 Passwords.</h1>
              {/*
                Generally it's bad to use "index" as a key.
                It's ok for this example because there will always
                be the same number of passwords, and they never
                change positions in the array.
              */}
              <p>{this.state.message}</p> 
          </div>
      </div>
    );
  }
}

export default App;
