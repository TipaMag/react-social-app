import React from 'react'

class ProfileStatus extends React.Component {
    state = {
        editMode: false
    }
    activateEditMode = () => {
        this.setState({
            editMode: true
        })
    }
    render() {
        return (
            <div>
                {!this.state.editMode &&
                    <div>
                        <span onClick={this.activateEditMode} >{this.props.profileStatus}</span>
                    </div>
                }
                {this.state.editMode &&
                    <div>
                        <input autoFocus={true} value={this.props.profileStatus} />
                    </div>
                }
            </div>
        )
    }
}
export default ProfileStatus