/**
 * Created by david2099 on 12/09/17.
 */
import React from 'react'
import VoteScoreBar from './VoteScoreBar'
import EditRemoveBar from './EditRemoveBar'
import { capitalize, formatDate } from '../utils/helpers'


class Comment extends React.Component {

    render() {
        const { comment, voteComment, deleteObj  } = this.props
        return (
            <div>
                <div className="col-md-6 col-sm-12">
                    <h5 className="small pull-left">Vote score: {comment.voteScore}</h5>
                </div>
                <div className="col-md-6 col-sm-12">
                    <h5 className="small">{capitalize(comment.author)} | {formatDate(comment.timestamp)}</h5>
                </div>
                <div className="clearfix"></div>
                <p className="body-content comment">{comment.body}</p>
                <div className="col-md-12">
                    <div className="col-md-4 col-sm-8 col-xs-12">
                        <VoteScoreBar voteObj={voteComment} obj={comment} />
                    </div>
                    <div className="col-md-4 col-sm-8 col-xs-12">
                        <EditRemoveBar deleteObj={(commentId) => this.handleDeleteComment(comment.id)} obj={comment} />
                    </div>
                    <div className="clearfix"></div>
                </div>
            </div>
        )
    }
}

export default Comment