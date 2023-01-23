
import axios from 'axios';
import { Component, createRef } from 'react';
import './App.css';
import SearchResults from './SearchResults';
import { MapContainer, Polygon, TileLayer, Marker, Popup } from 'react-leaflet';

const polygon = [
  [51.515, -0.09],
  [51.52, -0.1],
  [51.52, -0.12],
]
const purpleOptions = { color: 'purple' }
class App extends Component {
  componentDidMount() {
    this.fetchDataFromBackend(this.state.searchQuery)


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
  constructor(props) {
    super(props);
    this.state = {
      searchState: true,
      searchQuery: 'Boston MA', queryResults: [],
      selectedCentre: [],
    };
    this.inputFocus = createRef()

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleBlur = this.handleBlur.bind(this)
    this.handleFocus = this.handleFocus.bind(this)
  }

  handleChange(event) {
    this.setState({ searchQuery: event.target.value });
    this.fetchDataFromBackend(this.state.searchQuery)
  }

  handleSubmit(event) {
    event.preventDefault();
   
    this.fetchDataFromBackend(this.state.searchQuery)
    alert('Debug: ' + this.state.searchQuery);
  }
  parentHandleChange(params){
    console.log("params passed to parent's call back function",params)
  }

  handleBlur(event) {
    this.setState({ searchState: false });
  }

  handleFocus(event) {
    this.setState({ searchState: true });
  }


  render() {
    
    return (<div>



      <MapContainer
        center={[51.505, -0.09]}
        zoom={13}
        scrollWheelZoom={true}
        style={{ width: "600px", height: "calc(400px)" }}
      >
        <TileLayer
          url="http://{s}.tile.osm.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        />
        <Polygon pathOptions={purpleOptions} positions={polygon} />

      </MapContainer>
      <form onSubmit={this.handleSubmit}>
        <label >
          Name:
          <input ref={this.inputFocus.ref} autoFocus type="text" value={this.state.searchQuery} onBlur={this.handleBlur} onFocus={this.handleFocus} onChange={this.handleChange} />
        </label>
        <input type="submit" value="Submit" />

        {this.state.selectedCentre}
      </form>
        {

          <div className="dropdown-content">
            {<SearchResults results={this.state.queryResults} onHandleChange={(e) => this.parentHandleChange(e)}></SearchResults>}
          </div>
        }
    </div>
    );
  }
}

export default App
