import React from 'react'
import s from './Users.module.css'
import User from './User/User'
import Paggination from './../common/Paggination/Paggination'

const Users = ({users, onFollow, onUnfollow, followingInProgress, totalUsersCount, pageSize, currentPage, onPageChanged}) => {
   return (
      <div className={s.users}>
         <Paggination totalItemsCount={totalUsersCount} 
            pageSize={pageSize} 
            currentPage={currentPage} 
            onPageChanged={onPageChanged}
         />
         <ul className={s.usersList}>
            {users.map(item =>
               <User key={item.id} id={item.id} name={item.name} smallPhoto={item.photos.small} followed={item.followed} status={item.status}
                  onFollow={onFollow}
                  onUnfollow={onUnfollow}
                  followingInProgress={followingInProgress}
               />)
            }
         </ul>
      </div>
   )
}

export default Users