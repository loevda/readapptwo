import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import NavBar from './NavBar'
import NotFound from './NotFound'
import { connect } from 'react-redux'
import { fetchCategories } from '../actions'
import ListPosts from './ListPosts'
import Post from './Post'
import '../css/bootstrap.min.css';
import '../css/bootstrap-theme.min.css';
import '../css/App.css';


class App extends Component {

    componentWillMount() {
        this.props.fetchCategories()
    }

    render() {
        return (
            <BrowserRouter>
                <div className="App">
                    <NavBar categories={this.props.categories} />
                    <Switch>
                        <Route exact path="/" component={ListPosts}/>
                        <Route exact path="/:category/" component={ListPosts}/>
                        <Route exact path="/:category/:postId/" component={Post}/>
                        <Route exact path="/page/not/found/" component={NotFound}/>
                        <Route path="*" component={NotFound} />
                    </Switch>
                </div>
            </BrowserRouter>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        categories: state.categories
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        fetchCategories: () => dispatch(fetchCategories()),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(App)
