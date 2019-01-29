import React, {Component } from 'react'; 
import {Map, TileLayer, Marker, Popup} from 'react-leaflet'; 
import axios from 'axios';  
import { GeoSearchControl, OpenStreetMapProvider } from 'leaflet-geosearch';

class MyMap extends Component {
  constructor() {
    super();
    this.state = {
      markers: []
    };
  this.mapRef = React.createRef();
  this.addMarker = this.addMarker.bind(this);  
  this.clearMarker = this.clearMarker.bind(this);
  this.handleClick = this.handleClick.bind(this); 
  }

  componentDidMount() {
    const map = this.mapRef.current.leafletElement;
    const provider = new OpenStreetMapProvider();
    const searchControl = new GeoSearchControl({
      provider: provider,
      style: 'bar'
    }); 
    map.addControl(searchControl); 
    axios.get('/servermap/', {withCredentials: true}).then(response => {
      if (response.data.markers) {
        this.setState({
          markers: response.data.markers
        }); 
      } 
    });
  }

  addMarker(e) {
    const {markers} = this.state;
    markers.push({
      lat: e.latlng.lat, 
      lng: e.latlng.lng
    }); 
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
   
  handleClick() {
    const {markers} = this.state;
    axios.post('/servermap/', {
      savedMarkers: markers
    }, {withCredentials: true}) 
      .then((response) => {
        if (response.data.markers) {
          this.setState({
            markers: response.data.markers
          }); 
        } else {
          this.setState({
            markers: []
          }); 
        }
      }); 
  }
    
  render() {
    return (
      <div>
        <div class="row">
          <div class="col-md-12"><br></br>
            <p><button onClick={this.handleClick}>Save</button></p>
          </div>
        </div>        
        <Map 
          center={this.props.center}
          zoom={this.props.zoom} 
          ref={this.mapRef}
          onClick={this.addMarker} >
          <TileLayer
            attribution='Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> 
              contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, 
              Imagery © <a href="https://www.mapbox.com/">Mapbox</a>'
            url='https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}'
            maxZoom="18"
            id='mapbox.streets'
            accessToken="pk.eyJ1Ijoic2FuZHlrYXVyMjAwOCIsImEiOiJjanBybGFwNmUxMmJjM3hvM3VwMWxxYWN1In0.FdxuHjxYWRN5-V59QXPDUQ" />
          {this.state.markers.map((position, idx) => 
            <Marker key={`marker-${idx}`} position={position}>
              <Popup position={position}>
                <button onClick={(e) => this.clearMarker(position)}>Delete</button>
              </Popup>
            </Marker>
          )}
        </Map>
      </div>
    );
  }
}

export default MyMap; 