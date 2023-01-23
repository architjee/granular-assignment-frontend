
import { polygon } from 'leaflet';
import { Component } from 'react';
import './App.css';
import SearchResult from './components/SearchResult'
class SearchResults extends Component {

    constructor(props) {
        super(props);
        this.state = { searchQuery: '' };
        this.handleClick = this.handleClick.bind(this);
    }


    handleClick(search_result) {
        let createNewPolygon = []
        let bbox = search_result["boundingbox"]
        createNewPolygon=[[bbox[0],bbox[2]],[bbox[1],bbox[2]],[bbox[1],bbox[3]],[bbox[0],bbox[3]]]
        

        console.log('even fired is ', search_result)
        this.props.setLocation({
            "polygon": createNewPolygon,
            "purpleOptions": { color: "purple" },
            "center": [parseFloat(search_result["lat"]), parseFloat(search_result["lon"])],
            "placeid": search_result["place_id"]
        });
    }
    render() {
        return (
            <div>
                <div id="QueryResult" name="QueryResult" size={Math.min(10, this.props.results.length)} >
                    {this.props.results.map((search_result, index) => (search_result["type"] == "administrative" &&
                        <div key={index} onClick={()=>this.handleClick(search_result)}>{search_result['display_name']}</div>
                    ))}
                </div>

            </div>
        );
    }
}

export default SearchResults