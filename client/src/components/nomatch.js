import React, { Component } from 'react';  

class NoMatch extends Component {

  render() {
    return (
      <div>
        <div class="row">
          <div class="col-md-12">
            <h1>404</h1>
          </div>
        </div>
        <div class="row">
          <div class="col-md-12">
            <p>That page was not found, sorry.</p>
          </div>
        </div> 
      </div>
    ); 
  }
}

export default NoMatch; 