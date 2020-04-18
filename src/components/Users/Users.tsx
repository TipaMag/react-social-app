import React, { useEffect } from 'react'
import { compose } from 'redux'
import { connect } from 'react-redux'

import Paggination from '../common/Paggination/Paggination'
import User from './User/User'
import { Container, Controls, UsersList, NoUsers } from './Users.styles'

import { getUsers, getAuth, getUsersPageSize, getTotalUsersCount, getCurrentPage, getIsFetching, getFollowingInProgress, getSearchUser } from '../../redux/users-selectors'
import { AppStateType } from '../../redux/redux-store'
import { UserType } from '../../types/Users-types'
import { requestUsers, getNewPage, setFollow, setUnfollow, searchUsers } from '../../redux/users-reducer'
import { startChatting } from '../../redux/dialogs-reducer'
import Preloader from '../common/Preloader/Preloader'
import Search from './Search/Search'


type Props = MapStateProps & MapDispatchProps
const Users: React.FC<Props> = ({ users, isAuth, isFetching, startChatting, followingInProgress, totalUsersCount, pageSize, currentPage, ...props }) => {

   useEffect(() => {
      props.requestUsers(pageSize, currentPage)
      // eslint-disable-next-line react-hooks/exhaustive-deps
   }, [props.searchUser])
   const onPageChanged = (page: number) => {
      props.getNewPage(pageSize, page)
   }
   const onFollow = (userId: number) => {
      props.setFollow(userId)
   }
   const onUnfollow = (userId: number) => {
      props.setUnfollow(userId)
   }
   const onSearchUser = (searchUser: string) => {
      props.searchUsers(searchUser)
   }

   return (
      <Container>
         <Controls>
            {users.length > 0 &&
               <Paggination totalItemsCount={totalUsersCount}
                  pageSize={pageSize}
                  currentPage={currentPage}
                  onPageChanged={onPageChanged}
               />
            }
            <Search onSearchUser={onSearchUser} />
         </Controls>
         {isFetching ?
            <Preloader /> :
            (users.length > 1) ?
               <UsersList>
                  {users.map(item =>
                     <User key={item.id} userId={item.id} name={item.name} smallPhoto={item.photos.small} followed={item.followed} status={item.status}
                        isAuth={isAuth}
                        onFollow={onFollow}
                        onUnfollow={onUnfollow}
                        startChatting={startChatting}
                        followingInProgress={followingInProgress}
                     />)
                  }
               </UsersList> :
               <NoUsers>
                  <span>no users found</span>
               </NoUsers>
         }
      </Container>
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
   searchUser: string
}
interface MapDispatchProps {
   requestUsers: (pageSize: number, page: number) => void
   getNewPage: (pageSize: number, page: number) => void
   setFollow: (userId: number) => void
   setUnfollow: (userId: number) => void
   searchUsers: (searchUser: string) => void

   startChatting: (userId: number) => void
}
let mapStateToProps = (state: AppStateType) => ({
   users: getUsers(state),
   isAuth: getAuth(state),
   pageSize: getUsersPageSize(state),
   totalUsersCount: getTotalUsersCount(state),
   currentPage: getCurrentPage(state),
   isFetching: getIsFetching(state),
   followingInProgress: getFollowingInProgress(state),
   searchUser: getSearchUser(state)
})

export default compose(
   connect<MapStateProps, MapDispatchProps, null, AppStateType>(mapStateToProps, {
      requestUsers,
      getNewPage,
      setFollow,
      setUnfollow,
      searchUsers,

      startChatting
   })
)(Users)