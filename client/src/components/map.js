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
  this.logout = this.logout.bind(this);
  this.key = process.env.REACT_APP_MAP_TOKEN;
  }

  componentDidMount() {
    const map = this.mapRef.current.leafletElement;
    const provider = new OpenStreetMapProvider();
    const searchControl = new GeoSearchControl({
      provider: provider,
      autoClose: true,
      keepResult: false,
      retainZoomLevel: false,
      style: 'bar'
    }); 
    map.addControl(searchControl); 
    map.on('geosearch/showlocation', this.addMarker); 
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
      position: { lat: e.location.y, 
        lng: e.location.x },
      label: e.location.label
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
  
  logout() {
    axios.post('/auth/logout', {withCredentials: true})
      .then(response => {
        if (response.status === 200) {
          this.setState({redirectTo: '/'}); 
        }
      }).catch(error => {
        console.log('Logout error'); 
      }); 
  }

  render() {
    return (
      <div id='fullscreen'>
        <header class='App-header fullscreen'>           
        <div class='container'> 
        <button class='blue' type='button' onClick={this.handleClick}>Save</button>
        <button onClick={this.logout} class="blue" type="button">Logout</button>
        </div>
      </header> 
            <Map 
              center={this.props.center}
              zoom={this.props.zoom} 
              ref={this.mapRef} >
              <TileLayer
                attribution='Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> 
                contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, 
                Imagery © <a href="https://www.mapbox.com/">Mapbox</a>'
                url='https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}'
                maxZoom="18"
                id='mapbox.streets'
                accessToken={this.key} />
              {this.state.markers.map((marker, idx) => 
                <Marker key={`marker-${idx}`} position={marker.position}>
                  <Popup marker={marker} >
                    <p>{marker.label}</p>
                    <button onClick={(e) => this.clearMarker(marker)}>Delete</button>
                  </Popup>
                </Marker>
              )}
            </Map>
      </div>
    );
  }
}

export default MyMap; 