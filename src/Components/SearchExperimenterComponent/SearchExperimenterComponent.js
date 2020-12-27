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
        this.state = {experimenterNames: names}
    }

    chooseExperimenter = (experimenterName) => {
        this.props.history.push("/searchExperiment/" + experimenterName);
    } 

    render() {
        return (
            <div className="container">
                <SearchComponent chooseItem={this.chooseExperimenter} items={this.state.experimenterNames} text="choose experimenter" />
            </div>
        );
    }
}

export default SearchExperimenterComponent;