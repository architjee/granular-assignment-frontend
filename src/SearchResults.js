
import { Component } from 'react';
import './App.css';
import SearchResult from './components/SearchResult'
class SearchResults extends Component {

    constructor(props) {
        super(props);
        this.state = { searchQuery: '' };

    }
    render() {
        return (
            <ul>
                {this.props.results.map((search_result, index) => (
        <SearchResult key={index} content={search_result}></SearchResult>
      ))}
              
                <SearchResult content="hello2"></SearchResult>
            </ul>
        );
    }
}

export default SearchResults