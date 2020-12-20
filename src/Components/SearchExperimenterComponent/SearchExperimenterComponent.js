import { Component } from 'react';
import SearchComponent from '../SearchComponent/SearchComponent';

const names =  [
    "Adva Shoham",
    "Tal Honig",
    "Galit Yovel",
    "Maayan Trzawik",
    "Libi Kliger",
    "Mandy Rose",
    "Idan Grosbard",
    "Roni Hamri",
    "Ofir Z",
    "Linoy Schwartz"
];

class SearchExperimenterComponent extends Component{
    constructor(props){
        super(props);
        this.state = {experimenterNames: names, original: names}
    }

    render() {
        console.log(this.state.names)
        return (
            <div className="container">
                <SearchComponent items={this.state.experimenterNames} text="choose experimenter" />
            </div>
        );
    }
}

export default SearchExperimenterComponent;