import { Component } from 'react';
import "./ExperimentComponent.css"

const stub = [
    {
        id: "11111",
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
        this.state = {participants: stub, ids: []};
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
            <tr>
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
        let newIds = this.state.ids;

        if (!this.state.ids.includes(id)){
            newIds.push(id);
            console.log(newIds)
        } else {
            newIds = newIds.filter(item => item != id);
            console.log(newIds)
        }

        this.setState({ids: newIds});
    }

    getTableLine = (participantData) => {
        let chosen = this.state.ids.includes(participantData.id);
        return(
            <tr key={participantData.id}>
                <td><button onClick={this.onClick.bind(this, participantData.id)} className={chosen ? "chosen-participant" : "download-button"}/></td>
                <td>{participantData.id}</td>
                <td>{participantData.status}</td>
            </tr>
        );
    }

    render(){
        return (
            <div>
                <this.getTable></this.getTable>
            </div>
        );
    }
}

export default ExperimentComponent;