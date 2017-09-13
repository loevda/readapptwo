/**
 * Created by david2099 on 11/09/17.
 */
import React from 'react'
import { connect } from 'react-redux'
import { fetchPost, fetchPostComments, votePost } from '../actions'
import PostActionBar from './PostActionBar'
import PostInfo from './PostInfo'
import { capitalize, formatDate } from '../utils/helpers'

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
                <h1 className="faster">{post.title}</h1>
                <PostInfo post={post} numComments={comments.length} />
                <div className="clearfix"></div>
                <hr />
                <p>{post.body}</p>
                <hr />
                <PostActionBar votePost={votePost} post={post} />
                <hr />
                <div className="comments-cont">
                    {comments.map((comment) => (
                        <div className="col-md-12" key={comment.id}>
                            <div className="col-md-6 col-sm-12">
                                <h5 className="small pull-left">Vote score: {comment.voteScore}</h5>
                            </div>
                            <div className="col-md-6 col-sm-12">
                                <h5 className="small">{capitalize(comment.author)} | {formatDate(comment.timestamp)}</h5>
                            </div>
                            <div className="clearfix"></div>

                            <p>{comment.body}</p>
                            <hr />
                        </div>
                    ))}
                </div>
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