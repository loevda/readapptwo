/**
 * Created by david2099 on 02/09/17.
 */
import React from 'react';
import { Link } from 'react-router-dom'

const NotFound = () =>
    <section className="fOf">
        <div className="container">
            <div className="row">
                <div className="col-md-8 col-md-offset-2 col-sm-12 fOfRow">
                    <h1>404 PAGE NOT FOUND</h1>
                    <h2>We have a problem!</h2>
                    <h2>
                        <Link to="/" className="btn btn-danger">
                            BACK TO HOME <span className="glyphicon glyphicon-arrow-right" aria-hidden="true"></span>
                        </Link>
                    </h2>
                </div>
            </div>
        </div>
    </section>

export default NotFound;