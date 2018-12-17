import React, { Component } from 'react'; 
import L from 'leaflet'; 

class Map extends Component {

  componentDidMount() {
    // create map
    let map = L.map("map").setView([51.505, -0.09], 13); 
    L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {
      attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
      maxZoom: 18,
      id: 'mapbox.streets',
      accessToken: "pk.eyJ1Ijoic2FuZHlrYXVyMjAwOCIsImEiOiJjanBybGFwNmUxMmJjM3hvM3VwMWxxYWN1In0.FdxuHjxYWRN5-V59QXPDUQ"
  }).addTo(map);} 
  
  render() {
    return (
    <div id="map" style={{height: "400px"}}></div> ); 
  }
}

export default Map;