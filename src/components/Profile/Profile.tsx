import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { compose } from 'redux'
import { withRouter, RouteComponentProps } from 'react-router-dom'

import { getUserProfile } from '../../redux/profile-reducer'
import s from './Profile.module.css'
import ProfileInfo from './ProfileInfo/ProfileInfo'
import Posts from './Posts/Posts'
import { ProfileType } from './../../types/Profile-types'
import { AppStateType } from '../../redux/redux-store'

type Props = MapStateProps & MapDispatchProps & RouteComponentProps<{userId: string}>
const Profile: React.FC<Props> = ({ match, history, autorizedProfile, autorizedProfileStatus, profile, profileStatus, autorizedUserId, getUserProfile }) => {
  useEffect(() => {
    refreshProfile()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  const refreshProfile = () => {
    let userId: number | null = +match.params.userId
    if (!userId) {
      userId = autorizedUserId
      if (!userId) {
        history.push('/login')
        return
      }
    }
    if (userId !== autorizedUserId) {
      getUserProfile(userId)
    }
  }
  return (
    <div className={s.profile}>
      <ProfileInfo
        isOwner={!match.params.userId}
        //@ts-ignore   -   нужно будет нормально поправить косяк "с возможным null в профиле"
        profile={!match.params.userId ? autorizedProfile : profile}
        profileStatus={!match.params.userId ? autorizedProfileStatus : profileStatus}
      />
      <Posts />
    </div>
  )
}

interface MapStateProps {
  autorizedProfile: ProfileType | null
  autorizedProfileStatus: string
  profile: ProfileType | null
  profileStatus: string

  autorizedUserId: number | null
}
interface MapDispatchProps {
  getUserProfile: (userId: number) => void
}
let mapStateToProps = (state: AppStateType) => ({
  autorizedProfile: state.profilePage.autorizedProfile,
  autorizedProfileStatus: state.profilePage.autorizedProfileStatus,
  profile: state.profilePage.profile,
  profileStatus: state.profilePage.profileStatus,

  autorizedUserId: state.auth.userId,
})
export default compose(
  connect<MapStateProps, MapDispatchProps, {}, AppStateType>(mapStateToProps, {
    getUserProfile,
  }),
  withRouter,
)(Profile)

// <MapStateProps, MapDispatchProps, null, AppStateType>