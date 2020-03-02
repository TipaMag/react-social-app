import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { requestUsers, getNewPage, setFollow, setUnfollow } from '../../redux/users-reducer'
import { startChatting } from '../../redux/dialogs-reducer'
import Users from './Users'
import Preloader from '../common/Preloader/Preloader'
import { compose } from 'redux'
import { getUsers, getAuth, getUsersPageSize, getTotalUsersCount, getCurrentPage, getIsFetching, getFollowingInProgress } from '../../redux/users-selectors'
import { AppStateType } from '../../redux/redux-store'
import { UserType } from '../../types/Users-types'

type Props = MapStateProps & MapDispatchProps
const UsersContainer: React.FC<Props> = (props) => {
   useEffect(() => {
      props.requestUsers(props.pageSize, props.currentPage)
      // eslint-disable-next-line react-hooks/exhaustive-deps
   }, [])
   const onPageChanged = (page: number) => {
      props.getNewPage(props.pageSize, page)
   }
   const onFollow = (userId: number) => {
      props.setFollow(userId)
   }
   const onUnfollow = (userId: number) => {
      props.setUnfollow(userId)
   }
   return (
      <>
         {props.isFetching
            ? <Preloader />
            : null
         }
         <Users {...props}
            onPageChanged={onPageChanged}
            onFollow={onFollow}
            onUnfollow={onUnfollow}
         />   
      </>
   )
}

interface MapStateProps {
   users: Array<UserType>
   isAuth: boolean
   pageSize: number
   totalUsersCount: number
   currentPage: number
   isFetching: boolean
   followingInProgress: Array<number>
}
interface MapDispatchProps {
   requestUsers: (pageSize: number, page: number) => void
   getNewPage: (pageSize: number, page: number) => void
   setFollow: (userId: number) => void
   setUnfollow: (userId: number) => void
   startChatting: (userId: number) => void
}
let mapStateToProps = (state: AppStateType) => ({
   users: getUsers(state),
   isAuth: getAuth(state),
   pageSize: getUsersPageSize(state),
   totalUsersCount: getTotalUsersCount(state),
   currentPage: getCurrentPage(state),
   isFetching: getIsFetching(state),
   followingInProgress: getFollowingInProgress(state)
})


export default compose(
   connect<MapStateProps, MapDispatchProps, null, AppStateType>(mapStateToProps, {
      requestUsers,
      getNewPage,
      setFollow,
      setUnfollow,
      startChatting
   })
)(UsersContainer)