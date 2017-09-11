/**
 * Created by david2099 on 11/09/17.
 */
import React from 'react'
import { connect } from 'react-redux'
import { fetchPost, fetchPostComments, votePost } from '../actions'
import PostActionBar from './PostActionBar'

class Post extends React.Component {

    componentWillMount() {
        let postId = this.props.match.params.postId
        this.props.fetchPost(postId)
        this.props.fetchPostComments(postId)
    }

    render() {
        const { post, comments, votePost } = this.props
        return (
            <div className="container">
                <h1>{post.title}</h1>
                <div className="col-md-6">
                    <div className="pull-left">Vote score: {post.voteScore}</div>
                    <div className="pull-right">Nr. comments: {comments.length}</div>
                </div>
                <div className="clearfix"></div>
                <hr />
                <p>{post.body}</p>
                <hr />
                <PostActionBar votePost={votePost} post={post} />

            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        post: state.post,
        comments: state.comments
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        fetchPost: (postId) => dispatch(fetchPost(postId)),
        fetchPostComments: (postId) => dispatch(fetchPostComments(postId)),
        votePost: (postId, strVote) => dispatch(votePost(postId, strVote))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Post)