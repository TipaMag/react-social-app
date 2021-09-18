import React, { FC } from 'react'
import { Link } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import s from './ProfileInfo.module.css'
import { startChatting } from '../../../redux/dialogs-reducer'

import { ProfileStatus } from './ProfileStatus/ProfileStatus'
import { ProfilePhoto } from './ProfilePhoto/ProfilePhoto'
import ProfileData from './ProfileData/ProfileData'

import Button from '../../../elements/Button'
import Preloader from '../../common/Preloader/Preloader'
import { ProfileType } from '../../../types/Profile-types'

interface Props {
  isOwner: boolean
  isAuth: boolean
  profile: ProfileType
  profileStatus: string
}

export const ProfileInfo: FC<Props> = ({isOwner, profile, profileStatus, isAuth}) => {
  const dispatch = useDispatch()

  const onStartChatting = () => {
    if (isAuth) {
      dispatch(startChatting(profile.userId))
    }
  }

  if (!profile) return <Preloader />
  return (
    <div className={s.profileInfo}>
      <div className={s.profilePhotoContainer}>
        <ProfilePhoto
          isOwner={isOwner}
          profilePhoto={profile.photos.large}
        />
        {!isOwner &&
          <Link className={s.writeMessageBtn} to={'/dialogs/' + profile.userId} onClick={onStartChatting}>
            <Button type="button">write message</Button>
          </Link>
        }
      </div>
      <div className={s.userDescription}>
        <h1 className={s.userFullName}>{profile.fullName}</h1>
        {(isOwner || profileStatus) &&
          <ProfileStatus
            isOwner={isOwner}
            profileStatus={profileStatus}
          />
        }
        <ProfileData profile={profile} />
      </div>
    </div>
  )
}