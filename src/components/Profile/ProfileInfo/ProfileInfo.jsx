import React, { useState } from 'react'
import Preloader from '../../common/Preloader/Preloader'
import s from './ProfileInfo.module.css'
import ProfileStatusWithHooks from './ProfileStatus/ProfileStatusWithHooks'
import ProfilePhoto from './ProfilePhoto/ProfilePhoto'
import ProfileDataForm from './ProfileDataForm/ProfileDataForm'
import { NavLink } from 'react-router-dom'

const ProfileInfo = (props) => {
  
  let { profile, isOwner, setProfilePhoto, profileStatus, updateProfileStatus, saveProfileInfo, onStartChatting } = props
  
  let [editMode, setEditMode] = useState(false)
  const toggleEditMode = () => {
    setEditMode(!editMode)
  }
  const onSubmit = (values) => {
    saveProfileInfo(values).then(() => {
      toggleEditMode()
    })
  }

  if (!profile) {
    return (
      <Preloader />
    )
  }
  return (
    <div className={s.profileInfo}>
      <ProfilePhoto profilePhoto={profile.photos.large} isOwner={isOwner} setProfilePhoto={setProfilePhoto} />
      <div className={s.userDescription}>
        <h1 className={s.userFullName}>
          {props.profile.fullName}
        </h1>
        <ProfileStatusWithHooks profileStatus={profileStatus} updateProfileStatus={updateProfileStatus} isOwner={isOwner} />
        {!isOwner &&
          <NavLink to={'/dialogs/' + profile.userId}>
            <span onClick={onStartChatting}>написать сообщение</span>
          </NavLink>
        }
        {editMode
          ? <ProfileDataForm initialValues={profile} onSubmit={onSubmit} profile={profile} toggleEditMode={toggleEditMode} />
          : <ProfileData profile={profile} isOwner={isOwner} toggleEditMode={toggleEditMode} />
        }
      </div>
    </div>
  )
}

const ProfileData = ({ profile, isOwner, toggleEditMode }) => {
  return (
    <div>
      {isOwner && <div><button onClick={toggleEditMode}>edit</button></div>}
      <div className={s.ProfileJobInfo}>
        <div>
          <b>Looking for a job</b>: {profile.lookingForAJob ? 'Yes' : 'No'}
        </div>
        <div>
          <b>My professional skills</b>: {profile.lookingForAJobDescription || 'no info'}
        </div>
        <div>
          <b>About me</b>: {profile.aboutMe || 'no info'}
        </div>
      </div>
      contacts:
      <ul className={s.userContactsList}>
        {Object.keys(profile.contacts).map(key => {
          return (
            <li key={key}><b>{key}: </b>{profile.contacts[key]}</li>
          )
        })}
      </ul>
    </div>
  )
}

export default ProfileInfo