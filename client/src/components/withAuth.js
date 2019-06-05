import React, { Component } from 'react';
import axios from 'axios'; 
import Home from './home'; 
import MyMap from './map';

export default function withAuth() {
  return class extends Component {
    constructor() {
      super();
      this.state = {
        home: true,
        map: false,
      };
      this.mapRef = React.createRef();
    }
    componentDidMount() {
      axios.get('/checkToken')
        .then(res => {
          if (res.status === 200) {
            this.setState({ home: false, map: true });
          } else {
            this.setState({ home: true, map: false });
          }
        })
        .catch(err => {
          console.error(err);
        });
    }
    render() {
      const { home, map} = this.state;
      if (home) {
        return (
          <React.Fragment>
            <Home parentContext={this}/>
          </React.Fragment>
        );
      }
      if (map) {
        return (
          <React.Fragment>
            <MyMap appContext={this.props.appContext} map={'map'} center={{ lat: 20, lng: -0.09 }} zoom={2} ref={this.mapRef} />
          </React.Fragment>
        );
      }
    }
  }
}