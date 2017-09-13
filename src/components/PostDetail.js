/**
 * Created by david2099 on 13/09/17.
 */
import React from 'react'
import PostActionBar from './PostActionBar'
import { votePost } from '../actions'
import { connect } from 'react-redux'

class PostDetail extends React.Component {

    render() {
        const { post } = this.props
        return (
            <div>
                <h1 className="faster">{post.title}</h1>
                <div className="col-md-6">
                    <div className="pull-left">Vote score: {post.voteScore}</div>
                    <div className="pull-right">Nr. comments:</div>
                </div>
                <div className="clearfix"></div>
                <hr />
                <p>{post.body}</p>
                <hr />
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
            </div>
        )
    }

}


const mapDispatchToProps = (dispatch) => {
    return {
        votePost: (postId, strVote) => dispatch(votePost(postId, strVote))
    }
}

export default connect(null, mapDispatchToProps)(PostDetail)