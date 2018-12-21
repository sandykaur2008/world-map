import React, {Component } from 'react'; 
import {Map, TileLayer, Marker, Popup} from 'react-leaflet'; 

class MyMap extends Component {
  constructor() {
    super();
    this.state = {
      markers: []
    };
  this.addMarker = this.addMarker.bind(this);  
  }
  


  addMarker(e) {
    const {markers} = this.state;
    markers.push(e.latlng); 
    window.console.log("markers" + markers); 
    this.setState({markers: markers}); 
  }

  clearMarker(position) {
    const {markers} = this.state;
    const index = markers.indexOf(position);
    if (index > -1) {
      markers.splice(index, 1);
      this.setState({markers: markers}); 
    }
  }
   
    
  render() {
    return (
      <Map 
        center={[51.505, -0.09]} 
        onClick={this.addMarker}
        zoom={13} 
      >
      <TileLayer
          attribution='Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>'
          url='https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}'
          maxZoom="18"
          id='mapbox.streets'
          accessToken="pk.eyJ1Ijoic2FuZHlrYXVyMjAwOCIsImEiOiJjanBybGFwNmUxMmJjM3hvM3VwMWxxYWN1In0.FdxuHjxYWRN5-V59QXPDUQ"
      />
        {this.state.markers.map((position, idx) => 
          <Marker key={`marker-${idx}`} position={position}>
          <Popup position={position}>
            <button onClick={(e) => this.clearMarker(position)}>Delete</button>
            </Popup>
        </Marker>
          )}
        </Map>
      );
    }
  }

export default MyMap; 