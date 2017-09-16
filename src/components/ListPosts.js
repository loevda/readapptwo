/**
 * Created by david2099 on 11/09/17.
 */
import React from 'react'
import { connect } from 'react-redux'
import {
    fetchPosts,
    fetchCategoryPosts,
    votePosts,
    postsOrderedBy,
    fetchAllComments,
    fetchCategories,
    fetchPostDelete,
    addPost
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
        isCommentModalOpen: false
    }

    closeCommentModal = () => {
        this.setState({ isCommentModalOpen: false })
    }

    newPost = (e) => {
        this.setState({ isCommentModalOpen: true })
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
            const updatedPost = {
                ...postObj,
                id: generateUUID(),
                timestamp: new Date().getTime()
            }
            this.setState({isCommentModalOpen: false})
            this.props.addPost(updatedPost)
        }
    }



    componentDidMount() {
        let category = this.props.match.params.category
        category ? this.props.fetchCategoryPosts(category, this.props.match.params.category) : this.props.fetchPosts()
        this.props.fetchCategories()
        this.props.fetchAllComments(this.props.posts)
    }


    componentDidUpdate(prevProps, prevState) {
        if (!isEqual(this.props, prevProps)) {
            const category = this.props.match.params.category
            category ? this.props.fetchCategoryPosts(category, this.props.match.params.category) : this.props.fetchPosts()
            //this.props.fetchAllComments(this.props.posts)
        }
    }

    handleSorting(e) {
        this.props.postsOrderedBy(this.props.posts, e.target.value)
    }


    render() {

        const { posts, votePosts, sortBy } = this.props

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
                            <PostInfo post={post} numComments={this.props.comments.filter((comment) => { return comment.parentId === post.id}).length} />
                            <hr />
                            <div className="col-md-4 col-sm-6">
                                <VoteScoreBar voteObj={votePosts} obj={post} next="/"/>
                            </div>
                            <div className="col-md-6">
                                <EditRemoveBar deleteObj={(postId) => this.handleDeletePost(post.id)} obj={post} next="/"/>
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
                    isOpen={this.state.isCommentModalOpen}
                    onRequestClose={this.closeCommentModal}
                    contentLabel='Modal'
                    style={customStyles}
                >
                    <div className="content">
                        <div className="content-inner p20">
                            <div className="row">
                                <h3>New post</h3>
                                <form>

                                    <div className="form-group">
                                        <input type="text" required
                                               className="form-control"
                                               id="post-author"
                                               ref="post-author"
                                               name="post-author"
                                               placeholder="Your name"
                                        />
                                    </div>
                                    <div className="form-group">
                                        <input type="text" required
                                               className="form-control"
                                               id="post-title"
                                               ref="post-title"
                                               name="post-title"
                                               placeholder="Title"
                                        />
                                    </div>
                                    <div className="form-group">
                                        <select required
                                               className="form-control"
                                               id="post-category"
                                               ref="post-category"
                                               name="post-category"
                                               placeholder="category"
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
                                                      id="category-text" name="category-text" placeholder="Write post">
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
        comments: state.comments,
        categories: state.categories
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        fetchPosts: () => dispatch(fetchPosts()),
        fetchCategoryPosts: (categoryPath, path) => dispatch(fetchCategoryPosts(categoryPath, path)),
        votePosts: (postId, strVote) => dispatch(votePosts(postId, strVote)),
        postsOrderedBy: (posts, sortBy) => dispatch(postsOrderedBy(posts, sortBy)),
        fetchAllComments: (posts) => dispatch(fetchAllComments(posts)),
        fetchCategories: () => dispatch(fetchCategories()),
        addPost: (post) => dispatch(addPost(post)),
        fetchPostDelete: (postId) => dispatch(fetchPostDelete(postId))
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ListPosts))