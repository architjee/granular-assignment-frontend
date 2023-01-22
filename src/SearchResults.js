
import { Component } from 'react';
import './App.css';
import SearchResult from './components/SearchResult'
class SearchResults extends Component {

    constructor(props) {
        super(props);
        this.state = { searchQuery: '' };
        this.handleClick = this.handleClick.bind(this)
    }


    handleClick(event) {

        console.log('even fired', event)
        alert('A name was submitted: ' + this.state);
    }
    render() {
        return (<div>

            <button >x</button>
                <select name="cars" id="cars">
            
                {this.props.results.map((search_result, index) => (search_result["type"] == "administrative" &&
                    <SearchResult key={index} content={search_result} onClick={this.handleClick}></SearchResult>
                ))}
  <option value="volvo">Volvo</option>
  <option value="saab">Saab</option>
  <option value="mercedes">Mercedes</option>
  <option value="audi">Audi</option>
            
</select>



        </div>
        );
    }
}

export default SearchResults