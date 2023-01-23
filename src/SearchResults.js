
import { Component } from 'react';
import './App.css';
import { ConvertPlaceObject } from './Util';
class SearchResults extends Component {

    constructor(props) {
        super(props);
        this.state = { searchQuery: '' };
        this.handleClick = this.handleClick.bind(this);
    }


    handleClick(search_result) {
       this.props.setLocation(ConvertPlaceObject(search_result));
    }
    render() {
        return (
            <div>
                <div id="QueryResult" name="QueryResult" size={Math.min(10, this.props.results.length)} >
                    {this.props.results.map((search_result, index) => (
                        <div key={index} onClick={()=>this.handleClick(search_result)}>{search_result['display_name']}</div>
                    ))}
                </div>

            </div>
        );
    }
}

export default SearchResults