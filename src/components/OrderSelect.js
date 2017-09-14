/**
 * Created by david2099 on 13/09/17.
 */
import React from 'react'

class OrderSelect extends React.Component {

    handleSorting (e) {
        this.props.handleSorting(e)
    }

    render () {

        return (
            <div className="input-group input-group-lg  mt20">
                <span className="input-group-addon" id="basic-addon1">Sort by</span>
                <select value={this.props.sortBy} className="form-control" onChange={(event) => this.handleSorting(event)} aria-describedby="basic-addon1">
                    <option value="upVote">Higher vote score</option>
                    <option value="downVote">Lower vote score</option>
                    <option value="latest">Latest</option>
                    <option value="oldest">Oldest</option>
                </select>
            </div>
        )
    }

}

export default OrderSelect