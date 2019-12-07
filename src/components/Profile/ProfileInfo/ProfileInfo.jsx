import React from 'react'
import defaultUserImage from '../../../assets/images/default-user-image.png'
import Preloader from '../../common/Preloader/Preloader'
import s from './ProfileInfo.module.css'
import ProfileStatusWithHooks from './ProfileStatusWithHooks'

const ProfileInfo = (props) => {
  if (!props.profile) {
    return (
      <Preloader />
    )
  }
  return (
    <div className={s.profileInfo}>
      <div className={s.userPhoto}>
        <img src={props.profile.photos.large != null ? props.profile.photos.large : defaultUserImage} alt='profile_photo'></img>
      </div>
      <div className={s.userDescription}>
        <h1 className={s.userFullName}>
          {props.profile.fullName}
        </h1>
        <ProfileStatusWithHooks profileStatus={props.profileStatus} updateProfileStatus={props.updateProfileStatus}/>
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
      </div>
    </div>
  );
}

export default ProfileInfo