import axios from 'axios';
import { Component } from 'react';
import './App.css';

export default class App extends Component{

  componentDidMount() {
    console.log('hello')
  }
   render() {
    return (
      <div className="App">
        Learn React
      </div>
    );
  }
}
