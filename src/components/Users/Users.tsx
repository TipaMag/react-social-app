import React from 'react'
import Paggination from '../common/Paggination/Paggination'
import User from './User/User'
import { UsersContainer, Controls, UsersList } from './Users.styles'
import { UserType } from '../../types/Users-types'

interface Props {
   users: Array<UserType>
   isAuth: boolean
   onPageChanged: (page: number) => void
   onFollow: (userId: number) => void
   onUnfollow: (userId: number) => void
   startChatting: (userId: number) => void
   followingInProgress: Array<number>
   totalUsersCount: number
   pageSize: number
   currentPage: number
}

const Users: React.FC<Props> = ({ users, isAuth, onPageChanged, onFollow, onUnfollow, startChatting, followingInProgress, totalUsersCount, pageSize, currentPage }) => {
   return (
      <UsersContainer>
         <Controls>
            <Paggination totalItemsCount={totalUsersCount}
               pageSize={pageSize}
               currentPage={currentPage}
               onPageChanged={onPageChanged}
            />
         </Controls>
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
         </UsersList>
      </UsersContainer>
   )
}

export default Users