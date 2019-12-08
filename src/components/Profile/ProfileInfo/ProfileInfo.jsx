import React, { useState } from 'react'
import Preloader from '../../common/Preloader/Preloader'
import s from './ProfileInfo.module.css'
import ProfileStatusWithHooks from './ProfileStatus/ProfileStatusWithHooks'
import ProfilePhoto from './ProfilePhoto/ProfilePhoto'

const ProfileInfo = (props) => {

  let [moreInfo, setToggleMoreInfo] = useState(false)
  const toggleMoreInfo = () => {
    setToggleMoreInfo(!moreInfo)
  }

  if (!props.profile) {
    return (
      <Preloader />
    )
  }
  return (
    <div className={s.profileInfo}>
      <ProfilePhoto profilePhoto={props.profile.photos.large} />
      <div className={s.userDescription}>
        <h1 className={s.userFullName}>
          {props.profile.fullName}
        </h1>
        <ProfileStatusWithHooks profileStatus={props.profileStatus} updateProfileStatus={props.updateProfileStatus} />
        <div className={s.profileMoreInfo}>
          { !moreInfo &&
              <button onClick={toggleMoreInfo}>open more info</button>
          }
          { moreInfo &&
              <button onClick={toggleMoreInfo}>hide more info</button>
          }
        </div>
        {moreInfo &&
          <ul className={s.userContactsList}>
            contacts:
            <li>facebook: {props.profile.contacts.facebook}</li>
            <li>website: {props.profile.contacts.website}</li>
            <li>vk: {props.profile.contacts.vk}</li>
            <li>twitter: {props.profile.contacts.twitter}</li>
            <li>instagram: {props.profile.contacts.instagram}</li>
            <li>youtube: {props.profile.contacts.youtube}</li>
            <li>github: {props.profile.contacts.github}</li>
            <li>mainLink: {props.profile.contacts.mainLink}</li>
          </ul>
        }
      </div>
    </div>
  );
}

export default ProfileInfo