/**
 * Created by david2099 on 03/09/17.
 */
import React from 'react'
import { Link } from 'react-router-dom'
import { capitalize } from '../utils/helpers'

class NavBar extends React.Component {

    render () {
        return (
            <div>
                <nav className="navbar navbar-default">
                    <div className="container-fluid">
                        <div className="navbar-header">
                            <button type="button" className="navbar-toggle collapsed" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1" aria-expanded="false">
                                <span className="sr-only">Toggle navigation</span>
                                <span className="icon-bar"></span>
                                <span className="icon-bar"></span>
                                <span className="icon-bar"></span>
                            </button>
                            <Link to="/" className="navbar-brand faster">Readable App</Link>
                        </div>
                        <div className="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
                            <ul className="nav navbar-nav">

                            </ul>
                        </div>
                    </div>
                </nav>
                <section>
                    <div className="container">
                        <div className="row" id="app-title">
                            <div className="col-md-6 col-sm-12">
                                <h1 className="faster">Welcome to readable-App</h1>
                            </div>
                            <div className="col-md-6 col-sm-12 hidden-sm">
                                <Link to="/" className="btn btn-lg btn-default col-md-12 mt20"><span className="glyphicon glyphicon-plus-sign" aria-hidden="true"></span> New Post</Link>
                            </div>
                        </div>
                        <hr />
                        <div className="row">
                            <div className="btn-group btn-group-justified" role="group" aria-label="">
                                {this.props.categories.map((category) => (
                                    <div key={category.name} className="btn-group" role="group">
                                        <Link to={`/category/${category.name}`} className="btn btn-info">View posts for {capitalize(category.name)}</Link>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        )
    }

}

export default NavBar