/**
 * Created by david2099 on 11/09/17.
 */
import React from 'react'
import { withRouter } from 'react-router-dom'

class PostActionBar extends React.Component {

    onDeletePost(path) {
        this.props.history.push(path)
    }

    render() {
        const { votePost, post, next } = this.props
        return (
            <div className="btn-group btn-group-justified mt20" role="group" aria-label="">
                <div className="btn-group" role="group">
                    <button className="btn btn-group btn-info" role="group" onClick={() => votePost(post.id, "upVote")}>
                        <span className="glyphicon glyphicon-thumbs-up" aria-hidden="true"></span> +
                    </button>
                </div>
                <div className="btn-group" role="group">
                    <button className="btn btn-group btn-info" role="group" onClick={() => votePost(post.id, "downVote")}>
                        <span className="glyphicon glyphicon-thumbs-down" aria-hidden="true"></span> -
                    </button>
                </div>
                <div className="btn-group" role="group">
                    <button className="btn btn-group btn-info" role="group">
                        <span className="glyphicon glyphicon-edit" aria-hidden="true"></span> Edit
                    </button>
                </div>
                <div className="btn-group" role="group">
                    <button className="btn btn-group btn-info" role="group">
                        <span className="glyphicon glyphicon-remove" aria-hidden="true"></span> Delete
                    </button>
                </div>
            </div>
        )
    }

}

export default withRouter(PostActionBar)