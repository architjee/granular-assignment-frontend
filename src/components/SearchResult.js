
import { Component } from 'react';
import './searchresult.css';

class SearchResult extends Component {

    constructor(props) {
        super(props);
        this.state = { searchQuery: '' };

    }
    render() {
        return (
          
                

               <span>
                   {this.props.content['place_id']}

               </span> 
                

      
                
        );
    }
}

export default SearchResult