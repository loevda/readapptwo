/**
 * Created by david2099 on 11/09/17.
 */
import React from 'react'
import { connect } from 'react-redux'
import {
    fetchPosts,
    fetchVotePosts,
    postsOrderedBy,
    fetchCategories,
    fetchPostDelete,
    fetchAddPost,
    currentEditablePost,
    fetchEditPost
} from '../actions'
import { Link, withRouter } from 'react-router-dom'
import PostInfo from './PostInfo'
import { isEqual } from 'lodash'
import OrderSelect from './OrderSelect'
import VoteScoreBar from './VoteScoreBar'
import EditRemoveBar from './EditRemoveBar'
import Modal from 'react-modal'
import {
    customStyles,
    simpleInputValidation,
    generateUUID
} from '../utils/helpers'

class ListPosts extends React.Component {

    state = {
        isPostModalOpen: false
    }

    closePostModal = () => {
        this.setState({ isPostModalOpen: false })
        this.props.currentEditablePost(null)
    }

    newPost = (e) => {
        this.setState({ isPostModalOpen: true })
    }

    editPost = (e, post) => {
        this.props.currentEditablePost(post)
        this.setState({ isPostModalOpen: true })
    }

    handleDeletePost(postId) {
        this.props.fetchPostDelete(postId)
    }

    submtiPost (e) {
        e.preventDefault()
        const postObj = {
            author: this.refs['post-author'].value,
            title: this.refs['post-title'].value,
            category: this.refs['post-category'].value,
            body: this.refs['post-text'].value
        }

        if (!simpleInputValidation(postObj)) {
            alert('Please fill all fields with a minimum of 5 characters.')
        }else{
            if (this.props.editingPost) {
                //edit post
                const updPost = {
                    title: postObj.title,
                    body: postObj.body
                }
                this.setState({isPostModalOpen: false})
                this.props.fetchEditPost(this.props.editingPost.id, updPost)
            } else {
                const updatedPost = {
                    ...postObj,
                    id: generateUUID(),
                    timestamp: new Date().getTime()
                }
                this.setState({isPostModalOpen: false})
                this.props.fetchAddPost(updatedPost)
            }
        }
    }



    componentDidMount() {
        const category = this.props.match.params.category
        const path = category ? category : '/'
        this.props.fetchPosts(path)
    }


    componentDidUpdate(prevProps, prevState) {
        //tried every hacks possible that I found on the Internet
        // the only one that works is from here: https://goo.gl/cxiYcS
        if (!isEqual(this.props, prevProps)) {
            const category = this.props.match.params.category
            const path = category ? category : '/'
            this.props.fetchPosts(path)
        }
    }

    handleSorting(e) {
        this.props.postsOrderedBy(this.props.posts, e.target.value)
    }


    render() {

        const { posts, fetchVotePosts, sortBy, editingPost } = this.props

        return (
            <div className="container">
                <hr />
                <div className="row">
                    <div className="col-md-6 col-sm-12">
                        <OrderSelect sortBy={sortBy} handleSorting={(e) => this.handleSorting(e)} />
                    </div>
                    <div className="col-md-6 col-sm-12 form-group form-group-lg">
                        <button className="btn btn-lg btn-default col-md-12 mt20" onClick={(e) => this.newPost(e)}>
                            <span className="glyphicon glyphicon-plus-sign" aria-hidden="true"></span>
                            &nbsp;New Post
                        </button>
                    </div>
                </div>
                <hr />
                <div className="row">
                {posts.length > 0 ?
                    posts.map((post) => (
                        <div className="col-md-6 mt20 post-list-item" key={post.id}>
                            <h3 className="faster ft20 h100">
                                <Link to={`/${post.category}/${post.id}`}>
                                    {post.title}
                                </Link>
                            </h3>
                            <PostInfo post={post} numComments={post.comments} />
                            <hr />
                            <div className="col-md-4 col-sm-6">
                                <VoteScoreBar voteObj={fetchVotePosts} obj={post} next="/"/>
                            </div>
                            <div className="col-md-6">
                                <EditRemoveBar deleteObj={(postId) => this.handleDeletePost(post.id)} obj={post} editObj={(e, obj) => this.editPost(e, post)} next="/"/>
                            </div>
                            <div className="clearfix"></div>
                        </div>
                    )) :
                    <div className="text-center">
                        <h2 className="no-post">
                            There is no post available.
                            <br />
                            Start Posting now!
                        </h2>
                    </div>
                }
                </div>
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
                                <h3>Post form</h3>
                                <form>

                                    <div className="form-group">
                                        <input type={editingPost ? 'hidden' : 'text'} required
                                               className="form-control"
                                               id="post-author"
                                               ref="post-author"
                                               name="post-author"
                                               placeholder="Your name"
                                               defaultValue={editingPost ? editingPost.author : ''}
                                        />
                                    </div>
                                    <div className="form-group">
                                        <input type="text" required
                                               className="form-control"
                                               id="post-title"
                                               ref="post-title"
                                               name="post-title"
                                               placeholder="Title"
                                               defaultValue={editingPost ? editingPost.title : ''}
                                        />
                                    </div>
                                    <div className={editingPost ? 'form-group hidden' : 'form-group'}>
                                        <select defaultValue={editingPost ? editingPost.category : this.props.match.params.category} required
                                               className="form-control"
                                               id="post-category"
                                               ref="post-category"
                                               name="post-category"
                                               placeholder="category"
                                                disabled={editingPost ? 'disabled': ''}
                                        >
                                            {this.props.categories.map((category) => (
                                                <option key={`id-cat-${category.name}`} value={category.path}>{category.name}</option>
                                            ))}
                                        </select>
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
                                            defaultValue={editingPost ? editingPost.body : ''}>

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
        )
    }

}

const mapStateToProps = (state) => {
    return {
        posts: state.posts.posts,
        sortBy: state.posts.sortBy,
        path: state.posts.path,
        categories: state.categories,
        editingPost: state.posts.editingPost
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        fetchPosts: (path) => dispatch(fetchPosts(path)),
        fetchVotePosts: (postId, strVote) => dispatch(fetchVotePosts(postId, strVote)),
        postsOrderedBy: (posts, sortBy) => dispatch(postsOrderedBy(posts, sortBy)),
        fetchCategories: () => dispatch(fetchCategories()),
        fetchAddPost: (post) => dispatch(fetchAddPost(post)),
        fetchPostDelete: (postId) => dispatch(fetchPostDelete(postId)),
        currentEditablePost: (post) => dispatch(currentEditablePost(post)),
        fetchEditPost: (postId, post) => dispatch(fetchEditPost(postId, post))
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ListPosts))