import React, { Component } from 'react';
import { SnackbarProvider } from 'notistack';
import {
    HashRouter as Router,
    Route,
    Switch,
    Redirect
} from 'react-router-dom';

import './App.css';
import Supplies from './Components/Supplies/Supplies';


import Authentication from './Authentication';

class App extends Component {
    render() {
        return (
            <SnackbarProvider maxSnack={3}>
                <Router>
                    <div className="container">
                        <Switch>
                            <Route path="/Authentication" component={Authentication} />
                            <Redirect exact from="/" to="/Authentication" />                            
                        </Switch>
                        <Route exact path="/Supplies" component={Supplies} />
                    </div>
                </Router>
            </SnackbarProvider>
        );
    }
}

export default App;
