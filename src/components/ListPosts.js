/**
 * Created by david2099 on 11/09/17.
 */
import React from 'react'
import { connect } from 'react-redux'
import { fetchPosts, fetchCategoryPosts } from '../actions'
import { Link } from 'react-router-dom'


class ListPosts extends React.Component {

    componentDidMount() {
        let category = this.props.match.params.category
        category ? this.props.fetchCategoryPosts(category) : this.props.fetchPosts()
    }

    componentDidUpdate(prevProps) {
        let category = this.props.match.params.category
        let prevCategory = prevProps.match.params.category
        if (category) {
            category !== prevCategory ? this.props.fetchCategoryPosts(category) : null
        } else {
            this.props.fetchPosts()
        }
    }

    render() {

        const { posts } = this.props

        return (
            <div className="container">
                {this.props.posts.length > 0 ?
                    this.props.posts.map((post) => (
                        <div className="col-md-6" key={post.id}>
                            <h3 className="faster ft20">
                                <Link to={`/posts/${post.id}`}>
                                    {post.title}
                                </Link>
                            </h3>
                            <h5 className="small">Vote score: {post.voteScore}</h5>
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
        fetchCategoryPosts: (categoryPath) => dispatch(fetchCategoryPosts(categoryPath))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ListPosts)