import React, { useEffect } from 'react'
import styled from 'styled-components'
import { useDispatch, useSelector } from 'react-redux'
import { useRouteMatch, useHistory } from 'react-router-dom'

import { getUserProfile } from '../../redux/profile-reducer'
import { ProfileInfo } from './ProfileInfo/ProfileInfo'
import { Posts } from './Posts/Posts'
import * as profileSelectors from '../../redux/profile-selectors'


export const Profile: React.FC= () => {
  const match = useRouteMatch<{userId: string}>()
  const history = useHistory()

  const dispatch = useDispatch()
  const autorizedProfile = useSelector(profileSelectors.getAutorizedProfile)
  const autorizedProfileStatus = useSelector(profileSelectors.getAutorizedProfileStatus)
  const profile = useSelector(profileSelectors.getProfile)
  const profileStatus = useSelector(profileSelectors.getProfileStatus)
  const autorizedUserId = useSelector(profileSelectors.getAutorizedUserId)
  const isAuth = useSelector(profileSelectors.getIsAuth)

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


const ProfileContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: auto auto;
  grid-gap: 10px;
  position: relative;
`