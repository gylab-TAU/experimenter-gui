import { Component } from 'react';
import SearchComponent from '../SearchComponent/SearchComponent';
import { withRouter } from 'react-router-dom';

const names =  [
    "exp1",
    "exp2",
    "exp3",
    "exp4",
    "exp5",
    "exp6",
    "exp7",
    "exp8",
    "exp9",
    "exp10",
    "exp11",
    "exp12",
    "exp13",
    "exp14",
    "exp15",
    "exp16",
    "exp17",
    "exp18",
    "exp19",
    "exp20",
];

class SearchExperimentComponent extends Component {
    constructor(props) {
        super(props);
        this.state = { experimenterName: this.props.match.params.experimenterName, experimentNames: names };
    }

    render() {
        return (
            <div className="container">
                <h1>{this.state.experimenterName}</h1>
                <SearchComponent items={this.state.experimentNames} text="choose experiment" />
            </div>
        );
    }
}
export default withRouter(SearchExperimentComponent);