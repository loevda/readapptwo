/**
 * Created by david2099 on 11/09/17.
 */
import React from 'react'
import { connect } from 'react-redux'
import { fetchPosts, fetchCategoryPosts, votePosts, postsOrderedBy } from '../actions'
import { Link, withRouter } from 'react-router-dom'
import PostActionBar from './PostActionBar'
import PostInfo from './PostInfo'
import { isEqual } from 'lodash'

class ListPosts extends React.Component {

    componentDidMount() {
        let category = this.props.match.params.category
        category ? this.props.fetchCategoryPosts(category, this.props.match.params.category) : this.props.fetchPosts()
    }

    componentDidUpdate(prevProps, prevState) {
        if (!isEqual(this.props, prevProps)) {
            let category = this.props.match.params.category
            category ? this.props.fetchCategoryPosts(category, this.props.match.params.category) : this.props.fetchPosts()
            console.log('hh')
        }
    }

    handleSorting(e) {
        this.props.postsOrderedBy(this.props.posts, e.target.value)
    }


    render() {

        const { posts, votePosts, sortBy, author } = this.props

        return (
            <div className="container">
                <hr />
                <div className="row">
                    <div className="col-md-6 col-sm-12 form-group form-group-lg">
                        <div className="input-group input-group-lg  mt20">
                            <span className="input-group-addon" id="basic-addon1">Sort by</span>
                            <select defaultValue={sortBy} className="form-control" onChange={(event) => this.handleSorting(event)} aria-describedby="basic-addon1">
                                <option value="upVote">Higher vote score</option>
                                <option value="downVote">Lower vote score</option>
                                <option value="latest">Latest</option>
                                <option value="oldest">Oldest</option>
                            </select>
                        </div>
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
                            <PostActionBar votePost={votePosts} post={post} next="/"/>
                        </div>
                    )) :
                    <div className="text-center">
                        <h2 className="no-post">
                            There is not post available.
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