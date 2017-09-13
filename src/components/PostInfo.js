/**
 * Created by david2099 on 12/09/17.
 */
import React from 'react'
import { connect } from 'react-redux'
import { fetchPostComments } from '../actions'
import { formatDate } from '../utils/helpers'
import { withRouter } from 'react-router-dom'

class PostInfo extends React.Component {

    render () {

        const { voteScore, timestamp } = this.props
        const numComments = this.props.comments.length
        const readableDate = formatDate(timestamp)

        return (
            <div className="col-md-12 mb20">
                <h5 className="small col-md-6 col-sm-12">Vote score: {voteScore} / Nr. comments: {numComments}</h5>
                <h5 className="small col-md-6 col-sm-12">{readableDate}</h5>
            </div>
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
        fetchPostComments: (postId) => dispatch(fetchPostComments(postId))
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps, null, {
    pure: false
})(PostInfo))