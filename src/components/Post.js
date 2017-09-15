/**
 * Created by david2099 on 11/09/17.
 */
import React from 'react'
import { connect } from 'react-redux'
import { fetchPost, fetchPostComments, votePost, orderPostCommentsBy, fetchPostDelete, voteComment, addComment } from '../actions'
import VoteScoreBar from './VoteScoreBar'
import EditRemoveBar from './EditRemoveBar'
import OrderSelect from './OrderSelect'
import PostInfo from './PostInfo'
import { capitalize, formatDate, simpleInputValidation } from '../utils/helpers'
import Modal from 'react-modal'
import { withRouter } from 'react-router-dom'


const customStyles = {
    overlay : {
        position          : 'fixed',
        top               : 0,
        left              : 0,
        right             : 0,
        bottom            : 0,
        backgroundColor   : 'rgba(255, 255, 255, 0.75)',
        zIndex: '1000'
    },
    content : {
        top                   : '50%',
        left                  : '50%',
        right                 : 'auto',
        bottom                : 'auto',
        marginRight           : '-50%',
        transform             : 'translate(-50%, -50%)',
        border                : '1px solid black',
        display               : 'block',
        padding               : '20px',
        backgroundColor       : 'white'
    }
};

class Post extends React.Component {

    state = {
        isCommentModalOpen: false
    }

    openCommentModal =  () => {
        this.setState({
            isCommentModalOpen: true
        })
    }

    closeCommentModal = () => {
        this.setState({
            isCommentModalOpen: false
        })
    }

    componentDidMount() {
        const postId = this.props.match.params.postId
        const { history } = this.props
        this.props.fetchPost(postId, history)
        this.props.fetchPostComments(postId)
    }


    handleSorting (e) {
        this.props.orderPostCommentsBy(this.props.comments, e.target.value)
    }

    handleDelete(e) {
        const { post, history } = this.props
        this.props.fetchPostDelete(post.id, history)
    }

    postComment(e) {
        e.preventDefault()
        const commentObj = {
            author: this.refs['comment-author'].value,
            comment: this.refs['comment-text'].value
        }

        if (!simpleInputValidation(commentObj)) {
            alert('Pleae fill both the author and comment fields with a minimum of 5 characters.')
        }else{
            this.setState({isCommentModalOpen: false})
        }


    }

    render() {
        const { post, comments, votePost, sortBy, voteComment } = this.props

        return (

            <div className="container">
                <h1 className="faster">{post.title}</h1>
                <PostInfo post={post} numComments={comments.length} />
                <div className="clearfix"></div>
                <hr />
                <p className="body-content">{post.body}</p>
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
                        <button className="btn btn-lg btn-default col-md-12 mt20"
                                onClick={this.openCommentModal}
                        >
                            <span className="glyphicon glyphicon-plus-sign" aria-hidden="true"></span>
                            &nbsp;New Comment
                        </button>
                        <Modal
                            className='modal'
                            overlayClassName='overlay'
                            isOpen={this.state.isCommentModalOpen}
                            onRequestClose={this.closeCommentModal}
                            contentLabel='Modal'
                            style={customStyles}
                        >
                            <div className="content">
                                <div className="content-inner p20">
                                <div className="row">
                                    <h3>Post a comment</h3>
                                    <form>
                                        <div className="form-group">
                                             <input type="text" required
                                                    className="form-control"
                                                    id="comment-author"
                                                    ref="comment-author"
                                                    name="comment-author"
                                                    placeholder="Your name" />
                                        </div>
                                        <div className="form-group">
                                            <textarea required
                                                ref="comment-text"
                                                type="email"
                                                      className="form-control"
                                                      cols="40"
                                                      rows="8"
                                                      id="comment-text" name="comment-text" placeholder="Write comment">
                                            </textarea>
                                        </div>

                                        <button
                                            onClick={(e) => this.postComment(e)}
                                            type="submit" className="btn btn-default">Submit</button>
                                    </form>
                                </div>
                                </div>
                            </div>
                        </Modal>
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
        fetchPost: (postId, history) => dispatch(fetchPost(postId, history)),
        fetchPostComments: (postId) => dispatch(fetchPostComments(postId)),
        votePost: (postId, strVote) => dispatch(votePost(postId, strVote)),
        fetchPostDelete: (postId, history) => dispatch(fetchPostDelete(postId, history)),
        orderPostCommentsBy: (comments, sortBy) => dispatch(orderPostCommentsBy(comments, sortBy)),
        voteComment: (commentId, voteStr) => dispatch(voteComment(commentId, voteStr)),
        addComment: (comment) => dispatch(addComment(comment))
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Post))