import { TextField } from '@material-ui/core';
import { Component } from 'react';
import './SearchComponent.css';

class SearchComponent extends Component{
    constructor(props){
        super(props);
        this.state = {value:"", items: props.items, original: props.items}
    }

    updateValue = (event) => {
        this.setState({value: event.target.value});
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

    ItemList = (props) => {
        console.log(props)
        const items = props.items;
        const listItems = items.map((item) => <li className="list-item" key={item}>{item}</li>);

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

export default SearchComponent;