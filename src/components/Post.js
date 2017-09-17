/**
 * Created by david2099 on 11/09/17.
 */
import React from 'react'
import { connect } from 'react-redux'
import {
    fetchPost,
    fetchPostComments,
    votePost,
    orderPostCommentsBy,
    fetchPostDelete,
    fetchEditPostView,
    voteComment,
    fetchAddComment,
    fetchDeleteComment,
    fetchEditComment,
    currentEditableComment
} from '../actions'
import VoteScoreBar from './VoteScoreBar'
import EditRemoveBar from './EditRemoveBar'
import OrderSelect from './OrderSelect'
import PostInfo from './PostInfo'
import {
    capitalize,
    formatDate,
    simpleInputValidation,
    generateUUID,
    customStyles
} from '../utils/helpers'
import Modal from 'react-modal'
import { withRouter } from 'react-router-dom'




class Post extends React.Component {

    state = {
        isCommentModalOpen: false,
        isPostModalOpen: false,
    }

    openCommentModal =  () => {
        this.setState({
            isCommentModalOpen: true
        })
    }

    editComment = (e, comment) => {
        this.props.currentEditableComment(comment)
        this.setState({
            isCommentModalOpen: true
        })
    }

    editPost = (e, post) => {
        this.setState({
            isPostModalOpen: true
        })
    }

    submtiPost (e) {
        e.preventDefault()
        const postObj = {
            title: this.refs['post-title'].value,
            body: this.refs['post-text'].value
        }
        if (!simpleInputValidation(postObj)) {
            alert('Please fill all fields with a minimum of 5 characters.')
        }else{
            this.setState({isPostModalOpen: false})
            this.props.fetchEditPostView(this.props.post.id, postObj)
        }
    }

    closeCommentModal = () => {
        this.setState({
            isCommentModalOpen: false
        })
        this.props.currentEditableComment(null)
    }

    closePostModal = () => {
        this.setState({
            isPostModalOpen: false
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

    handleDeletePost(postId) {
        //param needed just for reuse of component in listPosts
        const { post, history } = this.props
        this.props.fetchPostDelete(post.id, history)
    }

    handleDeleteComment(commentId) {
        this.props.fetchDeleteComment(commentId)
    }


    postComment(e) {
        e.preventDefault()
        const commentObj = {
            author: this.refs['comment-author'].value,
            body: this.refs['comment-text'].value
        }

        if (!simpleInputValidation(commentObj)) {
            alert('Please fill both the author and comment fields with a minimum of 5 characters.')
        }else{
            if (this.props.editingComment) {
                this.props.fetchEditComment(this.props.editingComment.id,
                    {body: commentObj.body})
            }else {
                const updatedComment = {
                    ...commentObj,
                    id: generateUUID(),
                    parentId: this.props.post.id,
                    timestamp: new Date().getTime(),
                    voteScore: 1,
                    deleted: false,
                    parentDeleted: false
                }

                this.props.fetchAddComment(updatedComment)
            }
            this.setState({isCommentModalOpen: false})
        }
    }

    render() {
        const { post, comments, votePost, sortBy, voteComment, editingComment } = this.props

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
                        <EditRemoveBar
                            deleteObj={(postId) => this.handleDeletePost(postId)}
                            obj={post}
                            editObj={(e, obj) => this.editPost(e, post)} />
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
                                        <h3>Comment form</h3>
                                        <form>
                                            <div className={editingComment ? 'form-group hidden' : 'form-group'}>
                                                <input type="text" required
                                                       className="form-control"
                                                       id="comment-author"
                                                       ref="comment-author"
                                                       name="comment-author"
                                                       placeholder="Your name"
                                                       defaultValue={editingComment ? editingComment.author : ''}
                                                       disabled={editingComment ? 'disabled' : ''}
                                                />
                                            </div>
                                            <div className="form-group">
                                            <textarea required
                                                      ref="comment-text"
                                                      type="email"
                                                      className="form-control"
                                                      cols="40"
                                                      rows="8"
                                                      id="comment-text" name="comment-text" placeholder="Write comment"
                                                      defaultValue={editingComment ? editingComment.body : ''}
                                            >
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
                        <Modal
                            className='modal'
                            overlayClassName='overlay'
                            isOpen={this.state.isPostModalOpen}
                            onRequestClose={this.closePostModal}
                            contentLabel='Modal'
                            style={customStyles}
                        >
                            <div className="content">
                                <div className="content-inner p20">
                                    <div className="row">
                                        <h3>Edit post</h3>
                                        <form>
                                            <div className="form-group">
                                                <input type="text" required
                                                       className="form-control"
                                                       id="post-title"
                                                       ref="post-title"
                                                       name="post-title"
                                                       placeholder="Title"
                                                       defaultValue={post.title}
                                                />
                                            </div>
                                            <div className="form-group">
                                            <textarea required
                                                      ref="post-text"
                                                      className="form-control"
                                                      cols="40"
                                                      rows="8"
                                                      id="category-text"
                                                      name="category-text"
                                                      placeholder="Write post"
                                                      defaultValue={post.body}>

                                            </textarea>
                                            </div>

                                            <button
                                                onClick={(e) => this.submtiPost(e)}
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
                                    <div className="col-md-4 col-sm-8 col-xs-12">
                                        <EditRemoveBar
                                            deleteObj={(commentId) => this.handleDeleteComment(comment.id)}
                                            obj={comment}
                                            editObj={(e, obj) => this.editComment(e, comment)}
                                        />
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
        sortBy: state.post.sortBy,
        editingComment: state.post.editingComment
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
        fetchAddComment: (comment) => dispatch(fetchAddComment(comment)),
        fetchDeleteComment: (commentId) => dispatch(fetchDeleteComment(commentId)),
        currentEditableComment: (comment) => dispatch(currentEditableComment(comment)),
        fetchEditPostView: (postId, post) => dispatch(fetchEditPostView(postId, post)),
        fetchEditComment: (commentId, comment) => dispatch(fetchEditComment(commentId, comment))
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Post))