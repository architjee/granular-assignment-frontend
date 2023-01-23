
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
                        <div key={index} onClick={() => this.handleClick(search_result)} className="cursor-pointer rounded-2xl  p-4 shadow-xl">
                          <div class="block rounded-xl bg-white p-6 sm:p-8" href="">

                            <div className="mt-16 sm:pr-8">
                            <h3 class="text-xl font-bold text-gray-900">

                                {search_result['display_name']}
                            </h3>
                            <p className="mt-2 text-sm text-gray-500">
                                Latitude: {search_result["lat"]} <br></br>
                                Longitude: {search_result["lon"]}
                            </p>
                            </div>
                          </div>
                        </div>
                    ))}
                </div>

            </div>
        );
    }
}

export default SearchResults