import React from 'react'
import s from './Users.module.css'
import User from './User/User'
import Paggination from './../common/Paggination/Paggination'

const Users = (props) => {

   let usersItems = props.users.map(item =>
      <User key={item.id} id={item.id} name={item.name} smallPhoto={item.photos.small} followed={item.followed} status={item.status}
         onFollow={props.onFollow} //function
         onUnfollow={props.onUnfollow} //function
         followingInProgress={props.followingInProgress}
      />)
      
   return (
      <div className={s.users}>
         <Paggination totalItemsCount={props.totalUsersCount} 
            pageSize={props.pageSize} 
            currentPage={props.currentPage} 
            onPageChanged={props.onPageChanged}
         />
         <ul className={s.usersList}>
            {usersItems}
         </ul>
      </div>
   )
}

export default Users