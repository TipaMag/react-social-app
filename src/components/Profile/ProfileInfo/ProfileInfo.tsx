import React from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import s from './ProfileInfo.module.css'
import { startChatting } from '../../../redux/dialogs-reducer'
import { setProfilePhoto, updateProfileStatus } from '../../../redux/profile-reducer'

import ProfileStatus from './ProfileStatus/ProfileStatus'
import ProfilePhoto from './ProfilePhoto/ProfilePhoto'
import ProfileData from './ProfileData/ProfileData'

import Button from '../../../elements/Button'
import Preloader from '../../common/Preloader/Preloader'
import { AppStateType } from '../../../redux/redux-store'
import { ProfileType } from '../../../types/Profile-types'


type Props = OwnProps & MapStateProps & MapDispatchProps
const ProfileInfo: React.FC<Props> = ({ isOwner, profile, profileStatus, isAuth, updateProfileStatus, setProfilePhoto, startChatting }) => {
  const onStartChatting = () => {
    if (isAuth) {
      startChatting(profile.userId)
    }
  }
  if (!profile) {
    return (
      <Preloader />
    )
  }
  return (
    <div className={s.profileInfo}>
      <div className={s.profilePhotoContainer}>
        <ProfilePhoto
          isOwner={isOwner}
          profilePhoto={profile.photos.large}
          setProfilePhoto={setProfilePhoto}
        />
        {!isOwner &&
          <Link to={'/dialogs/' + profile.userId} onClick={onStartChatting}>
            <Button type="button">write a message</Button>
          </Link>
        }
      </div>
      <div className={s.userDescription}>
        <h1 className={s.userFullName}>{profile.fullName}</h1>
        <ProfileStatus
          isOwner={isOwner}
          profileStatus={profileStatus}
          updateProfileStatus={updateProfileStatus}
        />
        <ProfileData profile={profile} />
      </div>
    </div>
  )
}

interface OwnProps {
  isOwner: boolean
  profile: ProfileType
  profileStatus: string
}
interface MapStateProps {
  isAuth: boolean
}
interface MapDispatchProps {
  updateProfileStatus: (status: string) => void
  setProfilePhoto: (formData: FormData) => void
  startChatting: (userId: number) => void
}
let mapStateToProps = (state: AppStateType) => ({
  isAuth: state.auth.isAuth
})
export default connect<MapStateProps, MapDispatchProps, OwnProps, AppStateType>(mapStateToProps, {
  updateProfileStatus,
  setProfilePhoto,
  startChatting
})(ProfileInfo)