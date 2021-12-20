import { Component } from 'react';
import "./ExperimentComponent.css"
import { withRouter } from 'react-router-dom';
import ExcelService from '../../Services/ExcelService';
import DataService from '../../Services/DataService';

class ExperimentComponent extends Component {
    constructor(props) {
        super(props);
        this.state = { experimenterName: this.props.match.params.experimenterName, experimentName: this.props.match.params.experimentName, participants: [], ids: [], chooseAll: false, showDuplicates: false };
    }

    async componentDidMount() {
        await this.fetchParticipants();
    }

    fetchParticipants = async () => {
        let dataService = new DataService();
        let data = await dataService.getExperimentParticipants(this.state.experimenterName, this.state.experimentName);
        this.setState({ participants: data.participants, duplicates: data.duplicates })
    }

    getTable = () => {
        return (
            <table>
                <thead>
                    {this.getHeaders()}
                </thead>
                <tbody>
                    {this.getTableLines()}
                </tbody>
            </table>
        );
    }

    getHeaders = () => {
        return (
            <tr className="table-row">
                <th>Download</th>
                <th>ID</th>
            </tr>
        );
    }

    getTableLines = () => {
        let lines = [];

        this.state.participants.forEach(participant => {
            lines.push(this.getTableLine(participant));
        });

        if (this.state.showDuplicates) {
            for (let participantIndex in this.state.duplicates) {
                lines.push(this.getTableLine(this.state.duplicates[participantIndex]));
            }
        }

        return lines;
    }

    onClick = (id) => {
        if (this.state.chooseAll) {
            this.setState({ chooseAll: false });
        }

        let newIds = this.state.ids;

        if (!this.state.ids.includes(id)) {
            newIds.push(id);

            if (newIds.length == this.state.participants.length || newIds.length == this.state.participants.length + this.state.duplicates.length) {
                this.setState({ chooseAll: true });
            }
        } else {
            newIds = newIds.filter(item => item != id);
        }

        this.setState({ ids: newIds });
    }

    chooseAll = () => {
        if (this.state.chooseAll) {
            this.setState({ ids: [], chooseAll: false });
        } else {
            let newIds = this.state.participants.map(item => item);

            if (this.state.showDuplicates) {
                for (let duplicate in this.state.duplicates) {
                    newIds.push(this.state.duplicates[duplicate]);
                }
            }

            this.setState({ ids: newIds, chooseAll: true });
        }
    }

    showDuplicates = () => {
        let newValue = !this.state.showDuplicates;

        let newIds = this.state.ids;

        if (!newValue) {
            newIds = this.state.ids.filter(item => !this.state.duplicates.includes(item));

            this.setState({chooseAll: newIds.length == this.state.participants.length})
        } else if(this.state.chooseAll) {
            newIds = newIds.concat(this.state.duplicates);
        }

        this.setState({ showDuplicates: newValue, ids: newIds })
    }

    getTableLine = (participantData) => {
        let chosen = this.state.ids.includes(participantData);
        
        return (
            <tr className="table-row" key={participantData}>
                <td><button onClick={this.onClick.bind(this, participantData)} className={(chosen) ? "chosen-participant" : "download-button"} /></td>
                <td> <div className="id">{participantData}</div></td>
            </tr>
        );
    }

    goToExperimenterPage = () => {
        this.props.history.goBack();

    }

    download = () => {
        let e = new ExcelService();
        e.zipExport(this.state.experimentName, this.state.experimenterName, this.state.ids);
    }

    unified = () => {
        let e = new ExcelService();
        e.excelExport(this.state.experimentName, this.state.experimenterName, this.state.ids);
    }

    render() {
        return (
            <div className="container">
                <h1 className="experimenter-name" onClick={this.goToExperimenterPage.bind(this)}>{this.props.match.params.experimenterName}</h1>
                <h2>{this.props.match.params.experimentName}</h2>
                <div className="experiment-body">
                    <div className="data-controls">
                        <div className={this.state.duplicates == null ? "hide-duplicates-button" : "select-all"}>
                            <button className={this.state.showDuplicates ? "chosen-participant" : "download-button"} onClick={this.showDuplicates.bind(this)}></button>
                            <label>{"Show duplicates"}</label>
                        </div>
                        <div className="select-all">
                            <button className={this.state.chooseAll ? "chosen-participant" : "download-button"} onClick={this.chooseAll.bind(this)}></button>
                            <label>{"Select all"}</label>
                        </div>
                        <button onClick={this.download.bind(this)} className="download-csv">{"Download Selected"}</button>
                        <button onClick={this.unified.bind(this)} className="download-csv">{"Download Selected Unified"}</button>
                    </div>
                    <div className="table-metadata">
                        <div>
                            <label>{"Number of participants:"}</label>
                            <label>{this.state.participants.length}</label>
                        </div>
                        <div>
                            <label>{"Selected:"}</label>
                            <label>{this.state.ids.length}</label>
                        </div>
                    </div>
                    <this.getTable></this.getTable>
                </div>
            </div>
        );
    }
}

export default withRouter(ExperimentComponent);