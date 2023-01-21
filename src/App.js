
import axios from 'axios';
import { Component } from 'react';
import './App.css';
import SearchResults from './SearchResults';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';


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
    this.state = { searchQuery: 'Boston MA', queryResults: [] };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({ searchQuery: event.target.value });
    this.fetchDataFromBackend(this.state.searchQuery)
  }

  handleSubmit(event) {
    event.preventDefault();
    alert('A name was submitted: ' + this.state.searchQuery);
  }

  render() {
    return (<div>


      <form className="dropdown" onSubmit={this.handleSubmit}>
        <label >
          Name:
          <input type="text" value={this.state.searchQuery} onChange={this.handleChange} />
        </label>
        <div className="dropdown-content">
          <SearchResults results={this.state.queryResults}></SearchResults>
        </div>
        <input type="submit" value="Submit" />
      </form>

      <MapContainer center={[51.505, -0.09]} zoom={13} scrollWheelZoom={false}>
  <TileLayer
    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
  />
  <Marker position={[51.505, -0.09]}>
    <Popup>
      A pretty CSS3 popup. <br /> Easily customizable.
    </Popup>
  </Marker>
</MapContainer>
    </div>
    );
  }
}

export default App