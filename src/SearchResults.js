
import { Component } from 'react';
import './App.css';
import SearchResult from './components/SearchResult'
class SearchResults extends Component {

    constructor(props) {
        super(props);
        this.state = { searchQuery: '' };
        this.handleClick = this.handleClick.bind(this);

    }


    handleClick(e) {
        console.log('even fired is ', e)
        this.setState({ searchQuery: e.target.value });
        console.log("Fruit Selected!!", this.state);
    }
    render() {
        return (
            <div>
                <div id="QueryResult" name="QueryResult" size={Math.min(10, this.props.results.length)} >
                    {this.props.results.map((search_result, index) => (search_result["type"] == "administrative" &&
                        <div key={index} onClick={this.handleClick}>{search_result['place_id']}</div>
                    ))}
                </div>

            </div>
        );
    }
}

export default SearchResults