/**
 * Created by david2099 on 12/09/17.
 */
import React from 'react'

class Comment extends React.Component {

    render() {
        const { comment } = this.props
        return (
            <div>
                {comment.body}
            </div>
        )
    }
}

export default Comment