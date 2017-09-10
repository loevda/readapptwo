import React, { Component } from 'react';
import { BrowserRouter, Route, Switch, Link } from 'react-router-dom'
import NavBar from './NavBar'
import NotFound from './NotFound'
import '../css/bootstrap.min.css';
import '../css/bootstrap-theme.min.css';
import '../css/App.css';


class App extends Component {
    render() {
        return (
            <BrowserRouter>
                <div className="App">
                    <NavBar/>
                    <Switch>
                        <Route exact path="/" render={() => (
                            <div className="row">
                            </div>
                        )} />
                        <Route path="*" component={NotFound} />
                    </Switch>

                </div>
            </BrowserRouter>
        );
    }
}

export default App;
