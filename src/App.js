import React, {Component} from 'react';
import './App.css';
import ToolbarComponent from './Components/ToolbarComponent/ToolbarComponent';
import SearchExperimenterComponent from './Components/SearchExperimenterComponent/SearchExperimenterComponent';

class App extends Component {
  render() {
    return (
      <div className="App">
        <ToolbarComponent className="item"></ToolbarComponent>
        <SearchExperimenterComponent className="item"></SearchExperimenterComponent>
      </div>
    );
  }
}

export default App;
