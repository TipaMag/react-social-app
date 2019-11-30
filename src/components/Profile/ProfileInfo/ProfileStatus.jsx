import React from 'react'
import s from './ProfileInfo.module.css'

class ProfileStatus extends React.Component {
    state = {
        editMode: false,
        profileStatus: this.props.profileStatus
    }
    activateEditMode = () => {
        this.setState({
            editMode: true
        })
    }
    deactivateEditMode = () => {
        this.setState({
            editMode: false
        })
        if (this.props.profileStatus !== this.state.profileStatus) {
            this.props.updateProfileStatus(this.state.profileStatus)
        }
    }
    onStatusChange = (event) => {
        this.setState({
            profileStatus: event.target.value
        })
    }
    componentDidUpdate(prevProps, prevState) {
        if (prevProps.profileStatus !== this.props.profileStatus) {
            this.setState({
                profileStatus: this.props.profileStatus
            })
        }
    }
    render() {
        return (
            <div className={s.statusContainer}>
                {!this.state.editMode &&
                    <div>
                        <span onClick={this.activateEditMode} >{this.props.profileStatus !== '' ? this.props.profileStatus : 'change status'}</span>
                    </div>
                }
                {this.state.editMode &&
                    <div>
                        <input onChange={this.onStatusChange} onBlur={this.deactivateEditMode} autoFocus={true} value={this.state.profileStatus} />
                    </div>
                }
            </div>
        )
    }
}
export default ProfileStatus