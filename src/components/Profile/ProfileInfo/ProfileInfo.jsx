import React, { useState } from 'react'
import Preloader from '../../common/Preloader/Preloader'
import s from './ProfileInfo.module.css'
import ProfileStatusWithHooks from './ProfileStatus/ProfileStatusWithHooks'
import ProfilePhoto from './ProfilePhoto/ProfilePhoto'

const ProfileInfo = (props) => {
  let { profile, isOwner, setProfilePhoto, profileStatus, updateProfileStatus } = props

  let [moreInfo, setToggleMoreInfo] = useState(false)
  const toggleMoreInfo = () => {
    setToggleMoreInfo(!moreInfo)
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
        <ProfileStatusWithHooks profileStatus={profileStatus} updateProfileStatus={updateProfileStatus} />
        <div className={s.ProfileJobInfo}>
          <div>
            <b>Looking for a job</b>: {profile.lookingForAJob ? 'Yes' : 'No'}
          </div>
          <div>
            <b>My professional skills</b>: {profile.lookingForAJobDescription || 'no info'}
          </div>
        </div>
        <div className={s.profileMoreInfo}>
          {!moreInfo
            ? <button onClick={toggleMoreInfo}>open more info</button>
            : <button onClick={toggleMoreInfo}>hide more info</button>
          }
        </div>
        {moreInfo &&
          <ul className={s.userContactsList}>
            contacts:
            {Object.keys(profile.contacts).map(key => {
              return <Contacts key={key} contactTitle={key} contactValue={profile.contacts[key]} />
            })}
          </ul>
        }
      </div>
    </div>
  );
}

const Contacts = ({ contactTitle, contactValue }) => {
  return (
    <li><b>{contactTitle}:</b>{contactValue}</li>
  )
}

export default ProfileInfo