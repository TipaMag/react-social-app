import React from 'react'
import Paggination from './../common/Paggination/Paggination'
import User from './User/User'

import { UsersContainer, Controls, UsersList } from './Users.styles'


const Users = ({ users, onFollow, onUnfollow, followingInProgress, totalUsersCount, pageSize, currentPage, onPageChanged }) => {
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
                  onFollow={onFollow}
                  onUnfollow={onUnfollow}
                  followingInProgress={followingInProgress}
               />)
            }
         </UsersList>
      </UsersContainer>
   )
}

export default Users