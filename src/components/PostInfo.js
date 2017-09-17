/**
 * Created by david2099 on 12/09/17.
 */
import React from 'react'
import { capitalize, formatDate } from '../utils/helpers'

class PostInfo extends React.Component {

    render () {

        const { post, numComments } = this.props
        const readableDate = formatDate(post.timestamp)

        return (
            <div className="col-md-12 mb20">
                <h5 className="small col-md-5 col-sm-12">Vote score: {post.voteScore} / Nr. comments: {numComments}</h5>
                <h5 className="small col-md-7 col-sm-12">{capitalize(post.author)} | {readableDate}</h5>
            </div>
        )
    }
}

export default PostInfo