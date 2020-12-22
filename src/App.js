import React, {Component} from 'react';
import './App.css';
import ToolbarComponent from './Components/ToolbarComponent/ToolbarComponent';
import SearchExperimenterComponent from './Components/SearchExperimenterComponent/SearchExperimenterComponent';
import SearchExperimentComponent from './Components/SearchExperimentComponent/SearchExperimentComponent';
import {Route, Link, Switch} from 'react-router-dom';
class App extends Component {
  render() {
    return (
      <div className="App">
        <ToolbarComponent className="item"></ToolbarComponent>
        <Switch>
          <Route exact path="/" component={SearchExperimenterComponent}/>
          <Route exact path="/searchExperiment/:experimenterName" component={SearchExperimentComponent} />
        
        </Switch>
      </div>
    );
  }
}

export default App;
