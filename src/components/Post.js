/**
 * Created by david2099 on 11/09/17.
 */
import React from 'react'
import { connect } from 'react-redux'
import { fetchPost } from '../actions'

class Post extends React.Component {

    render() {
        return (
            <div className="container">
                <h1>Welcome to post page</h1>
            </div>
        )
    }
}

export default Post