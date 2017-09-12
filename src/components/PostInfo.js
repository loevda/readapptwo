/**
 * Created by david2099 on 12/09/17.
 */
import React from 'react'
import { formatDate } from '../utils/helpers'

class PostInfo extends React.Component {

    render () {

        const { voteScore, numComments, timestamp } = this.props
        const readableDate = formatDate(timestamp)

        return (
            <div className="col-md-12 mb20">
                <h5 className="small col-md-6 col-sm-12">Vote score: {voteScore} / Nr. comments: {numComments}</h5>
                <h5 className="small col-md-6 col-sm-12">{readableDate}</h5>
            </div>
        )
    }
}

export default PostInfo