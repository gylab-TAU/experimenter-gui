import { Toolbar, Button } from '@material-ui/core';
import { Component } from 'react';
import facia_recognition from './facial_recognition.svg';
import './ToolbarComponent.css'

class TooolbarComponent extends Component{
    render(){
        return (
            <div className="toolbar-component">
                <Toolbar className="toolbar-style">
                    <Button className="button-style"><img width="100" height="50" src={facia_recognition}></img> Home</Button>
                </Toolbar>
            </div>
        )
    }
}

export default TooolbarComponent;