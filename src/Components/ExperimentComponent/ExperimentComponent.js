import { Component } from 'react';
import "./ExperimentComponent.css"
import { withRouter } from 'react-router-dom';
import ExcelService from '../../Services/ExcelService';

const stub = [
    {
        id: "11111111111111111111111111111111111111111111111111111111",
        status: "complete"
    },

    {
        id: "22222",
        status: "partially complete"
    },

    {
        id: "33333",
        status: "not complete"
    }
]

class ExperimentComponent extends Component{
    constructor(props){
        super(props);
        this.state = {participants: stub, ids: [], chooseAll: false};
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
        return(
            <tr className="table-row">
                <th>Download</th>
                <th>ID</th>
                <th>Completion Status</th>
            </tr>
        );
    }

    getTableLines = () => {
        let lines = [];

        this.state.participants.forEach(participant => {
            lines.push(this.getTableLine(participant));
        });

        return lines;
    }

    onClick = (id) => {
        if (this.state.chooseAll){
            this.setState({chooseAll: false});
        }

        let newIds = this.state.ids;

        if (!this.state.ids.includes(id)){
            newIds.push(id);
            console.log(newIds)

            if (newIds.length == this.state.participants.length){
                this.setState({chooseAll: true});
            }
        } else {
            newIds = newIds.filter(item => item != id);
            console.log(newIds)
        }

        this.setState({ids: newIds});
    }

    chooseAll = () => {
        if (this.state.chooseAll){
            this.setState({ids:[], chooseAll:false});
        } else {
            let newIds = this.state.participants.map(item => item.id);
            this.setState({ids: newIds, chooseAll: true});
        }
    }

    getTableLine = (participantData) => {
        let chosen = this.state.ids.includes(participantData.id);
        return(
            <tr className="table-row" key={participantData.id}>
                <td><button onClick={this.onClick.bind(this, participantData.id)} className={(chosen) ? "chosen-participant" : "download-button"}/></td>
                <td> <div className="id">{participantData.id}</div></td>
                <td>{participantData.status}</td>
            </tr>
        );
    }

    goToExperimenterPage = () => {
        this.props.history.goBack();
        
    }

    download = () => {
        let e = new ExcelService();
        e.excelExport();
    }

    unified = () => {
        let e = new ExcelService();
        e.zipExport();
    }

    render(){
        return (
            <div className="container">
                <h1 className="experimenter-name" onClick={this.goToExperimenterPage.bind(this)}>{this.props.match.params.experimenterName}</h1>
                <h2>{this.props.match.params.experimentName}</h2>
                <div className="experiment-body">
                <div className="data-controls">
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