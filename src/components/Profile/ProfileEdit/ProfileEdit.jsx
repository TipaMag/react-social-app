import React from "react"
import s from './ProfileEdit.module.css'
import { connect } from "react-redux"
import ProfileDataForm from "./ProfileDataForm/ProfileDataForm"
import { saveProfileInfo } from './../../../redux/profile-reducer'
import { withRouter } from "react-router-dom"
import { compose } from "redux"


const ProfileEditContainer = ({ profile, saveProfileInfo, history}) => {
    const onSubmit = (values) => {
        saveProfileInfo(values)
            .then(() => {
            history.push('/profile')
        })
    }
    return (
        <div className={s.profileEdit}>
            <ProfileDataForm initialValues={profile} onSubmit={onSubmit} profile={profile} />
        </div>
    )
}

const mapStateToProps = (state) => ({
    profile: state.profilePage.autorizedProfile,
})

export default compose(
  connect(mapStateToProps, {
    saveProfileInfo
  }),
  withRouter
)(ProfileEditContainer)