/**
 * Created by david2099 on 14/09/17.
 */
import React from 'react'

class EditRemoveBar extends React.Component {

    render() {
        return (
            <div className="btn-group btn-group-justified mt20" role="group" aria-label="">
                <div className="btn-group" role="group">
                    <button className="btn btn-group btn-info" role="group"
                        onClick={(obj) => this.props.editObj(this.props.obj)}
                    >
                        <span className="glyphicon glyphicon-edit" aria-hidden="true"></span> Edit
                    </button>
                </div>
                <div className="btn-group" role="group">
                    <button className="btn btn-group btn-info" role="group" onClick={(objId) => this.props.deleteObj(this.props.obj.id)}>
                        <span className="glyphicon glyphicon-remove" aria-hidden="true"></span> Delete
                    </button>
                </div>
            </div>
        )
    }

}

export default EditRemoveBar