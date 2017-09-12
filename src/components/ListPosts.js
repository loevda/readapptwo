/**
 * Created by david2099 on 11/09/17.
 */
import React from 'react'
import { connect } from 'react-redux'
import { fetchPosts, fetchCategoryPosts, votePost } from '../actions'
import { Link } from 'react-router-dom'
import PostActionBar from './PostActionBar'
import PostInfo from './PostInfo'


class ListPosts extends React.Component {

    componentDidMount() {
        let category = this.props.match.params.category
        category ? this.props.fetchCategoryPosts(category) : this.props.fetchPosts()
    }

    componentDidUpdate(prevProps) {
        let category = this.props.match.params.category
        category ? this.props.fetchCategoryPosts(category) : this.props.fetchPosts()
    }

    render() {

        const { posts, votePost } = this.props

        return (
            <div className="container">
                <hr />
                <div className="row">
                    <div className="col-md-6 col-sm-12 form-group form-group-lg">
                        <select className="form-control col-md-12 mt20">
                            <option> -- Order by --</option>
                            <option>Vote score</option>
                            <option>Publication date</option>
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
                            <PostActionBar votePost={votePost} post={post} />
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
        posts: state.posts
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        fetchPosts: () => dispatch(fetchPosts()),
        fetchCategoryPosts: (categoryPath) => dispatch(fetchCategoryPosts(categoryPath)),
        votePost: (postId, strVote) => dispatch(votePost(postId, strVote))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ListPosts)