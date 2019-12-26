import React from 'react'
import Preloader from '../../common/Preloader/Preloader'
import s from './ProfileInfo.module.css'
import ProfileStatus from './ProfileStatus/ProfileStatus'
import ProfilePhoto from './ProfilePhoto/ProfilePhoto'
import { NavLink } from 'react-router-dom'
import ProfileData from './ProfileData/ProfileData'

const ProfileInfo = ({ profile, isOwner, setProfilePhoto, profileStatus, updateProfileStatus, onStartChatting }) => {

  if (!profile) {
    return (
      <Preloader />
    )
  }
  return (
    <div className={s.profileInfo}>
      <div className={s.profilePhotoContainer}>
        <ProfilePhoto profilePhoto={profile.photos.large} isOwner={isOwner} setProfilePhoto={setProfilePhoto} />
        {!isOwner &&
          <NavLink to={'/dialogs/' + profile.userId} onClick={onStartChatting}>write a message</NavLink>
        }
      </div>
      <div className={s.userDescription}>
        <h1 className={s.userFullName}>{profile.fullName}</h1>
        <ProfileStatus profileStatus={profileStatus} updateProfileStatus={updateProfileStatus} isOwner={isOwner} />
        <ProfileData profile={profile}/>
      </div>
    </div>
  )
}

export default ProfileInfo