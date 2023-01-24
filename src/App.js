
import axios from 'axios';
import { Component, createRef } from 'react';
import './App.css';
import SearchResults from './SearchResults';
import { MapContainer, Polygon, TileLayer } from 'react-leaflet';
import { useNavigate, useLocation } from "react-router-dom";
import { ConvertPlaceObject } from './Util';
var HOSTED_URL = "https://granular-assignment-frontend.netlify.app/#"


class App extends Component {
  async componentDidMount() {
    let location
    try {
      let pathname = this.props.location.pathname
      if (pathname && pathname.length > 1) {

        let lastIndexOfDelimiter = pathname.lastIndexOf('/')
        location = pathname.substr(1, lastIndexOfDelimiter - 1)
        await this.setState({ 'searchQuery': location })
        console.log('changing location to ', decodeURI(location))
        if (!location) {
          location = pathname
        }
        await this.setState({ searchQuery: decodeURI(location) })
        let place_id = pathname.substr(lastIndexOfDelimiter + 1,)
        console.log('We are going to work for place_id', place_id)
        await this.fetchDataFromBackend(decodeURI(location))
        await this.findLocationByPlaceId(place_id)

      } else {
        throw new Error('search query looks empty')
      }
    } catch (error) {
      console.log('some error occured, changing back to fallback state', error)
      location = "Boston MA"
      await this.setState({ searchQuery: location })
      this.fetchDataFromBackend(location)
    }

  }
  async fetchDataFromBackend(location) {
    this.props.navigate(location)
    try {
      console.log('we are going to fire query for ', location)
      // const response = await axios.get('https://cors-anywhere.herokuapp.com/https://nominatim.openstreetmap.org/search.php?', { params: { q: 'boston', format: 'jsonv2' } });
      const response = await axios.get('https://nominatim.openstreetmap.org/search.php?', { params: { q: location, format: 'jsonv2' } });
      console.log('response from axios request', response);
      let filtered_response = []
      if (response.data && response.data.length > 0) {
        for (let i = 0; i < response.data.length; i++) {
          if (response.data[i]["type"] === "administrative") {
            filtered_response.push(response.data[i])
          }
        }
      }

     await this.setState({
        queryResults: filtered_response
      });
    } catch (error) {
      console.error(error);
    }
  }
  async findLocationByPlaceId(place_id) {
    try {

      // we will try to find it.
      
      for (let index_it = 0; index_it < this.state.queryResults.length; index_it++) {
        console.log(String(this.state.queryResults[index_it]["place_id"]), "~~~~~~~~~", String(place_id))
        if (this.state.queryResults[index_it]["place_id"] === Number(place_id)) {
          console.log('if block satisfied')
          this.setNewLocation(ConvertPlaceObject(this.state.queryResults[index_it]))
          return this.state.queryResults[index_it]
        }

      }
        
    } catch (error) {
      console.log('error at findlocation by placeId', error)
      // Check if 
      if (this.state.queryResults) {
        // Try setting the first one
        this.setNewLocation(ConvertPlaceObject(this.state.queryResults[0]))
      }
    }
    console.log('Exiting findLocationByPlaceId')
  }
  async setNewLocation(newLocationObject) {
    this.props.navigate(this.state.searchQuery + '/' + newLocationObject["placeid"]);
    await this.setState({ 'locationObject': newLocationObject })

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

  async handleChange(event) {
    await this.setState({ searchQuery: event.target.value });
  }

  async handleSubmit(event) {
    event.preventDefault();
    await this.fetchDataFromBackend(this.state.searchQuery)
  }



  render() {

    return (<div className='container w-md max-w-md mx-auto py-8 '>

      <h1 className="text-3xl font-bold underline py-3 pt-4">
        Location finder :::
      </h1>

      <MapContainer className='pt-4' key={'container_' + this.state.locationObject.placeid}
        center={this.state.locationObject.center}
        zoom={13}
        scrollWheelZoom={true}
        style={{ width: "600px", height: "calc(400px)" }}
      >
        <TileLayer key={'tile_' + this.state.locationObject.placeid}
          url="https://{s}.tile.osm.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://osm.org/copyright">OpenStreetMap</a> contributors'
        />
        <Polygon key={'polygon_' + this.state.locationObject.placeid} pathOptions={this.state.locationObject.purpleOptions} positions={this.state.locationObject.polygon} />

      </MapContainer>
      <button className='underline' onClick={() => { navigator.clipboard.writeText(HOSTED_URL + this.props.location.pathname) }}>Copy Link</button>


      <form onSubmit={this.handleSubmit} className="search-form">
        <label className='border' >
          Search Location By Keywords :
          <input className='border-2' ref={this.inputFocus.ref} autoFocus type="text" value={this.state.searchQuery} onChange={this.handleChange} />
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

