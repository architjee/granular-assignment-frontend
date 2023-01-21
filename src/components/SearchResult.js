
import { Component } from 'react';
import './searchresult.css';

class SearchResult extends Component {

    constructor(props) {
        super(props);
        this.state = { searchQuery: '' };

    }
    render() {
        return (
            <li>
                <div className='card'>

                <button>{this.props.content['place_id']}</button>
                </div>

            </li>
                
        );
    }
}

export default SearchResult