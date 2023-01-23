
import axios from 'axios';
import { Component, createRef } from 'react';
import './App.css';
import SearchResults from './SearchResults';
import { MapContainer, Polygon, TileLayer} from 'react-leaflet';
import { useNavigate, useLocation } from "react-router-dom";
var HOSTED_URL = "http://localhost:3000/#"


class App extends Component {
  componentDidMount() {
    let location
    try {
      let pathname =  this.props.location.pathname
      if(pathname && pathname.length>1){

        let lastIndexOfDelimiter = pathname.lastIndexOf('/')
        console.log(pathname, 'looks like this')
        location = pathname.substr(1, lastIndexOfDelimiter)
        this.setState({'searchQuery': location})
        console.log('changing location to ', location)
        let place_id = pathname.substr(lastIndexOfDelimiter+1, )
        this.fetchDataFromBackend(location).then(this.findLocationByPlaceId(place_id))
      }else{
        throw new Error('search query looks empty')
      }
    } catch (error) {
      console.log('some error occured, changing back to fallback state', error)
      location = "Boston MA"
      this.setState({searchQuery: location})
      this.fetchDataFromBackend(location)
    }

  }
  async fetchDataFromBackend(location) {
  
    try {
      console.log('we are going to fire query for ', location)
      // const response = await axios.get('https://cors-anywhere.herokuapp.com/https://nominatim.openstreetmap.org/search.php?', { params: { q: 'boston', format: 'jsonv2' } });
      const response = await axios.get('https://nominatim.openstreetmap.org/search.php?', { params: { q: location, format: 'jsonv2' } });
      console.log('response from axios request', response);
      this.setState({
        queryResults: response.data
      });
    } catch (error) {
      console.error(error);
    }
  }
  findLocationByPlaceId(place_id){
    console.log('getting placeid')
  }
  setNewLocation(newLocationObject) {
    this.props.navigate(this.state.searchQuery+'/'+this.state.locationObject["placeid"]);
    this.setState({ 'locationObject': newLocationObject })

  }
  constructor(props) {
    super(props);

    console.log('this.props.crea', this.props.history)
    this.state = {
      searchState: true,
      searchQuery: 'Boston MA', queryResults: [],
      locationObject: {
        "polygon": [
          [
            "30.7811345",
            "-83.8026067"
          ],
          [
            "30.802999",
            "-83.8026067"
          ],
          [
            "30.802999",
            "-83.7774578"
          ],
          [
            "30.7811345",
            "-83.7774578"
          ]
        ],
        "purpleOptions": {
          "color": "purple"
        },
        "center": [
          30.7918613,
          -83.7898868
        ],
        "placeid": 297593859
      }
    };
    this.inputFocus = createRef()
    console.log(this.state.locationObject)
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.setNewLocation = this.setNewLocation.bind(this);
  }

  handleChange(event) {
    this.setState({ searchQuery: event.target.value });
  }

  handleSubmit(event) {
    event.preventDefault();
    this.fetchDataFromBackend(this.state.searchQuery)
  }
  


  render() {

    return (<div>



      <MapContainer key={'container_' + this.state.locationObject.placeid}
        center={this.state.locationObject.center}
        zoom={13}
        scrollWheelZoom={true}
        style={{ width: "600px", height: "calc(400px)" }}
      >
        <TileLayer key={'tile_' + this.state.locationObject.placeid}
          url="http://{s}.tile.osm.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        />
        <Polygon key={'polygon_' + this.state.locationObject.placeid} pathOptions={this.state.locationObject.purpleOptions} positions={this.state.locationObject.polygon} />

      </MapContainer>
      <button onClick={() => {navigator.clipboard.writeText(HOSTED_URL+this.props.location.pathname)}}>Copy Link</button>


      <form onSubmit={this.handleSubmit} className="search-form">
        <label >
          Name:
          <input ref={this.inputFocus.ref} autoFocus type="text" value={this.state.searchQuery}  onChange={this.handleChange} />
        </label>
        <input type="submit" value="Submit" />

        {this.state.selectedCentre}
      </form>

     
      {

        <div className="search-results">
          {<SearchResults results={this.state.queryResults} setLocation={this.setNewLocation}></SearchResults>}
        </div>
      }
    </div>
    );
  }
}


function AppWithNavigate(props) {
  let navigate = useNavigate();
  let location = useLocation()
  return <App navigate={navigate} location={location} />
}

export default AppWithNavigate
// / copy to clipboard navigator.clipboard.writeText(this.props.location.)

