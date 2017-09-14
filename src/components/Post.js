/**
 * Created by david2099 on 11/09/17.
 */
import React from 'react'
import { connect } from 'react-redux'
import { fetchPost, fetchPostComments, votePost, orderPostCommentsBy, fetchPostDelete, voteComment } from '../actions'
import VoteScoreBar from './VoteScoreBar'
import EditRemoveBar from './EditRemoveBar'
import OrderSelect from './OrderSelect'
import PostInfo from './PostInfo'
import { capitalize, formatDate } from '../utils/helpers'
import { Link, withRouter} from 'react-router-dom'

class Post extends React.Component {

    componentDidMount() {
        let postId = this.props.match.params.postId
        this.props.fetchPost(postId)
        this.props.fetchPostComments(postId)
    }

    handleSorting (e) {
        this.props.orderPostCommentsBy(this.props.comments, e.target.value)
    }

    handleDelete(e) {
        const { post, history } = this.props
        this.props.fetchPostDelete(post.id, history)
    }

    render() {
        const { post, comments, votePost, sortBy, voteComment } = this.props

        return (
            <div className="container">
                <h1 className="faster">{post.title}</h1>
                <PostInfo post={post} numComments={comments.length} />
                <div className="clearfix"></div>
                <hr />
                <p>{post.body}</p>
                <hr />
                <div className="col-md-12 mb20">
                    <div className="col-md-6">
                        <VoteScoreBar voteObj={votePost} obj={post} />
                    </div>
                    <div className="col-md-6">
                        <EditRemoveBar deletePost={(e) => this.handleDelete(e)} obj={post} />
                    </div>
                </div>

                <hr />
                <div className="col-md-12">

                <div className="col-md-12">
                    <h4 className="faster border-title mt20">Comments section</h4>
                </div>


                <div className="col-md-6 col-sm-12 form-group form-group-lg">
                    <OrderSelect sortBy={sortBy} handleSorting={(e) => this.handleSorting(e)} key="comment-ordering" />
                </div>
                <div className="col-md-6 col-sm-12 form-group form-group-lg">
                    <Link to="/"
                          className="btn btn-lg btn-default col-md-12 mt20">
                        <span className="glyphicon glyphicon-plus-sign" aria-hidden="true"></span>
                        &nbsp;New Comment
                    </Link>
                </div>

                <hr />

                <div className="comments-cont">
                    {comments.map((comment) => (
                        <div className="col-md-12 comment-cont mt20 mb40" key={comment.id}>
                            <div className="col-md-6 col-sm-12">
                                <h5 className="small pull-left">Vote score: {comment.voteScore}</h5>
                            </div>
                            <div className="col-md-6 col-sm-12">
                                <h5 className="small">{capitalize(comment.author)} | {formatDate(comment.timestamp)}</h5>
                            </div>
                            <div className="clearfix"></div>
                            <p className="body-content comment">{comment.body}</p>
                            <div className="col-md-12">
                                <div className="col-md-4 col-sm-8 col-xs-12">
                                    <VoteScoreBar voteObj={voteComment} obj={comment} />
                                </div>
                                <div className="clearfix"></div>
                            </div>

                        </div>
                    ))}
                </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        post: state.post.post,
        comments: state.post.comments,
        sortBy: state.post.sortBy
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        fetchPost: (postId) => dispatch(fetchPost(postId)),
        fetchPostComments: (postId) => dispatch(fetchPostComments(postId)),
        votePost: (postId, strVote) => dispatch(votePost(postId, strVote)),
        fetchPostDelete: (postId, history) => dispatch(fetchPostDelete(postId, history)),
        orderPostCommentsBy: (comments, sortBy) => dispatch(orderPostCommentsBy(comments, sortBy)),
        voteComment: (commentId, voteStr) => dispatch(voteComment(commentId, voteStr))
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Post))