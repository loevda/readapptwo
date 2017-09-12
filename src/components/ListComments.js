/**
 * Created by david2099 on 12/09/17.
 */
import React from 'react'
import { connect } from 'react-redux'
import { fetchComments } from '../actions'

class ListComments extends React.Component {

    componentDidMount() {
        const { postId, comments } = this.props
    }

    render() {
        return (
            <div></div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        comments: state.comments
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        fetchComments: (postId) => dispatch(fetchComments(postId))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ListComments)