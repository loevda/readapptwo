/**
 * Created by david2099 on 14/09/17.
 */
import React from 'react'

class VoteScoreBar extends React.Component {

    render() {
        const { votePost, obj } = this.props
        return (
            <div className="btn-group btn-group-justified mt20" role="group" aria-label="">
                <div className="btn-group" role="group">
                    <button className="btn btn-group btn-info" role="group" onClick={() => votePost(obj.id, "upVote")}>
                        <span className="glyphicon glyphicon-thumbs-up" aria-hidden="true"></span> +
                    </button>
                </div>
                <div className="btn-group" role="group">
                    <button className="btn btn-group btn-info" role="group" onClick={() => votePost(obj.id, "downVote")}>
                        <span className="glyphicon glyphicon-thumbs-down" aria-hidden="true"></span> -
                    </button>
                </div>
            </div>
        )
    }

}

export default VoteScoreBar