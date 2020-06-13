import React, { useEffect } from 'react'
import styled from 'styled-components'
import { useDispatch, useSelector } from 'react-redux'
import { compose } from 'redux'
import { withRouter, RouteComponentProps } from 'react-router-dom'

import { getUserProfile } from '../../redux/profile-reducer'
import ProfileInfo from './ProfileInfo/ProfileInfo'
import Posts from './Posts/Posts'
import { AppStateType } from '../../redux/redux-store'

const ProfileContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: auto auto;
  grid-gap: 10px;
  position: relative;
`

type Props = RouteComponentProps<{userId: string}>
const Profile: React.FC<Props> = ({ match, history }) => {

  const dispatch = useDispatch()
  const autorizedProfile = useSelector((state: AppStateType) => state.profilePage.autorizedProfile)
  const autorizedProfileStatus = useSelector((state: AppStateType) => state.profilePage.autorizedProfileStatus)
  const profile = useSelector((state: AppStateType) => state.profilePage.profile)
  const profileStatus = useSelector((state: AppStateType) => state.profilePage.profileStatus)
  const autorizedUserId = useSelector((state: AppStateType) => state.auth.userId)
  const isAuth = useSelector((state: AppStateType) => state.auth.isAuth)

  useEffect(() => {
    const loadProfile = () => {
      let userId: number | null = +match.params.userId
      if (!userId) {
        userId = autorizedUserId
        if (!userId) {
          history.push('/login')
          return
        }
      }
      if (userId !== autorizedUserId) {
        dispatch(getUserProfile(userId))
      }
    }
    loadProfile()
  }, [autorizedUserId, dispatch, history, match.params.userId])

  return (
    <ProfileContainer>
      <ProfileInfo
        isOwner={!match.params.userId}
        isAuth={isAuth}
        //@ts-ignore   -   нужно будет нормально поправить косяк "с возможным null в профиле"
        profile={!match.params.userId ? autorizedProfile : profile}
        profileStatus={!match.params.userId ? autorizedProfileStatus : profileStatus}
      />
      <Posts />
    </ProfileContainer>
  )
}

export default compose(withRouter)(Profile)