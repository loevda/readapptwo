/**
 * Created by david2099 on 11/09/17.
 */
import React from 'react'
import { connect } from 'react-redux'
import { fetchPosts, fetchCategoryPosts, votePost, postsOrderedBy } from '../actions'
import { Link, withRouter } from 'react-router-dom'
import PostActionBar from './PostActionBar'
import PostInfo from './PostInfo'


class ListPosts extends React.Component {

    componentDidMount() {
        let category = this.props.match.params.category
        category ? this.props.fetchCategoryPosts(category, this.props.match.params.category) : this.props.fetchPosts()
    }

    componentDidUpdate(prevProps) {
        let category = this.props.match.params.category
        category ? this.props.fetchCategoryPosts(category, this.props.match.params.category) : this.props.fetchPosts()
    }

    handleSorting(e) {
        this.props.postsOrderedBy(this.props.posts, e.target.value)
    }


    render() {

        const { posts, votePost } = this.props

        return (
            <div className="container">
                <hr />
                <div className="row">
                    <div className="col-md-6 col-sm-12 form-group form-group-lg">
                        <select className="form-control col-md-12 mt20" onChange={(event) => this.handleSorting(event)}>
                            <option> -- Order by --</option>
                            <option value="upVote">Higher vote score</option>
                            <option value="downVote">Lower vote score</option>
                            <option value="latest">Latest</option>
                            <option value="oldest">Oldest</option>
                        </select>
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
                            <PostInfo voteScore={post.voteScore} numComments={3} timestamp={post.timestamp} />
                            <hr />
                            <PostActionBar votePost={votePost} post={post} next="/"/>
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
        posts: state.posts.posts
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        fetchPosts: () => dispatch(fetchPosts()),
        fetchCategoryPosts: (categoryPath, path) => dispatch(fetchCategoryPosts(categoryPath, path)),
        votePost: (postId, strVote) => dispatch(votePost(postId, strVote)),
        postsOrderedBy: (posts, sortBy) => dispatch(postsOrderedBy(posts, sortBy))
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ListPosts))