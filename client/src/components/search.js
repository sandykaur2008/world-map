import { withLeaflet, MapControl } from 'react-leaflet'; 
import { GeoSearchControl, OpenStreetMapProvider } from 'leaflet-geosearch';

class Search extends MapControl {
  createLeafletElement() {
    return GeoSearchControl({
      provider: new OpenStreetMapProvider(),
      style: 'bar',
    });
  }

  componentDidMount() {
    const map = this.props.mapRef;
    map.addControl(this.leafletElement);
  }
}
export default withLeaflet(Search);