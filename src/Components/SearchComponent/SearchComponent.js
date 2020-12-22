import { Component } from 'react';
import './SearchComponent.css';
import { withRouter } from 'react-router-dom';

class SearchComponent extends Component{
    constructor(props){
        super(props);
        this.state = {value:"", items: props.items, original: props.items}
    }

    handlChange = (event) => {
        let newValue = event.target.value;
        this.setState({value: newValue});
        this.filterItems(newValue);
    }

    filterItems = (value) => {
        let array = this.state.original.map(x => x);
        const filtered = array.filter(item => {
            return item.toLowerCase().includes(value.toLocaleLowerCase());
        });
        this.setState({items: filtered});
    }

    chooseExperimenter = (experimenterName) => {
        this.props.history.push("/searchExperiment/" + experimenterName);
    } 

    ItemList = (props) => {
        const items = props.items;
        const listItems = items.map((item) => <li onClick={this.chooseExperimenter.bind(this, item)} className="list-item" key={item}>{item}</li>);

        return(<ul>{listItems}</ul>);
    }

    render(){
        return (
            <div className="container">
                <h2>{this.props.text}</h2>
                <input className="textbox" type="text"  value={this.state.value} onChange={this.handlChange} placeholder={"Filter..."} />
                <this.ItemList items={this.state.items}></this.ItemList>
            </div>
        )
    }
}

export default withRouter(SearchComponent);