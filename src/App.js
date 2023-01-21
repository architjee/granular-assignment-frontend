import axios from 'axios';
import { Component } from 'react';
import './App.css';


export default class App extends Component {
  constructor(props) {
    // Required step: always call the parent class' constructor
    super(props);

    // Set the state directly. Use props if necessary.
    this.state = {
      loggedIn: false,
      currentState: "not-panic",


      // Note: think carefully before initializing
      // state based on props!
      someInitialValue: this.props.initialValue
    }
  }

  async fetchDataFromBackend(location){
    try {
      const response = await axios.get('https://cors-anywhere.herokuapp.com/https://nominatim.openstreetmap.org/search.php?',{ params: { q: 'boston',format: 'jsonv2' } });
      console.log('response from axios request',response);
      this.setState({
        currentState: response.data
      });
    } catch (error) {
      console.error(error);
    }
  }
  componentDidMount() {
    this.fetchDataFromBackend('boston')
    

  }
  render() {
    return (
      <div className="App">
        Learn React
      </div>
    );
  }
}
