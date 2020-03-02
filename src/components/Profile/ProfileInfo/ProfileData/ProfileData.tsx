import React from 'react'
import s from './ProfileData.module.css'
import { ProfileType } from '../../../../types/Profile-types'

interface Props {
  profile: ProfileType
}
const ProfileData: React.FC<Props> = ({ profile }) => {
  return (
    <div className={s.profileData}>
      <div className={s.profileDataShort}>
        <div className={s.profileDataRow}>
          <div className={s.rowLabel}>Looking for a job:</div>
          <div className={s.rowLabeled}>{profile.lookingForAJob ? 'Yes' : 'No'}</div>
        </div>
        <div className={s.profileDataRow}>
          <div className={s.rowLabel}>My professional skills:</div>
          <div className={s.rowLabeled}>{profile.lookingForAJobDescription || 'no info'}</div>
        </div>
        <div className={s.profileDataRow}>
          <div className={s.rowLabel}>About me:</div>
          <div className={s.rowLabeled}>{profile.aboutMe || 'no info'}</div>
        </div>
      </div>
      <div className={s.profileDataContacts}>
        <span>contacts</span> 
          {Object.keys(profile.contacts).map(key => {
          return (
            <div className={s.profileDataRow} key={key}>
              <div className={s.rowLabel}>{key}:</div>
              //@ts-ignore
              <div className={s.rowLabeled}>{profile.contacts[key]}</div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default ProfileData