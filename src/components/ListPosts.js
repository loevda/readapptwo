/**
 * Created by david2099 on 11/09/17.
 */
import React from 'react'
import { connect } from 'react-redux'
import { fetchPosts, fetchCategoryPosts, votePosts, postsOrderedBy } from '../actions'
import { Link, withRouter } from 'react-router-dom'
import PostInfo from './PostInfo'
import { isEqual } from 'lodash'
import OrderSelect from './OrderSelect'
import VoteScoreBar from './VoteScoreBar'

class ListPosts extends React.Component {

    componentDidMount() {
        let category = this.props.match.params.category
        category ? this.props.fetchCategoryPosts(category, this.props.match.params.category) : this.props.fetchPosts()
    }

    componentDidUpdate(prevProps, prevState) {
        if (!isEqual(this.props, prevProps)) {
            const category = this.props.match.params.category
            category ? this.props.fetchCategoryPosts(category, this.props.match.params.category) : this.props.fetchPosts()
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
                        <Link to="/"
                              className="btn btn-lg btn-default col-md-12 mt20">
                            <span className="glyphicon glyphicon-plus-sign" aria-hidden="true"></span>
                            &nbsp;New Post
                        </Link>
                    </div>
                </div>
                <hr />
                <div className="row">
                {posts.length > 0 ?
                    posts.map((post) => (
                        <div className="col-md-6" key={post.id}>
                            <h3 className="faster ft20 h100">
                                <Link to={`/posts/${post.id}`}>
                                    {post.title}
                                </Link>
                            </h3>
                            <PostInfo post={post} numComments={3} />
                            <hr />
                            <div className="col-md-4 col-sm-6">
                                <VoteScoreBar votePost={votePosts} obj={post} next="/"/>
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
            </div>
        )
    }

}

const mapStateToProps = (state) => {
    return {
        posts: state.posts.posts,
        sortBy: state.posts.sortBy,
        path: state.posts.path
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        fetchPosts: () => dispatch(fetchPosts()),
        fetchCategoryPosts: (categoryPath, path) => dispatch(fetchCategoryPosts(categoryPath, path)),
        votePosts: (postId, strVote) => dispatch(votePosts(postId, strVote)),
        postsOrderedBy: (posts, sortBy) => dispatch(postsOrderedBy(posts, sortBy))
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ListPosts))