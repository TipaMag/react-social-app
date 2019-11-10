import React from 'react'
import s from './Users.module.css'
import User from './User/User'

const Users = (props) => {
   // debugger
   let pagesCount = Math.ceil(props.totalUsersCount / props.pageSize)
   let pages = []

   for (let i = 1; i <= pagesCount; i++) {
      pages.push(i)
   }

   let usersItems = props.users.map(item => <User key={item.id}
      id={item.id}
      smallPhoto={item.photos.small}
      followed={item.followed}
      name={item.name}
      status={item.status}

      setFollow={props.setFollow}
      setUnfollow={props.setUnfollow}
      followingInProgress={props.followingInProgress} />)

   let pagesList = pages.map(page => {
      return <span className={props.currentPage === page ? s.selectedPage : ''} key={page} onClick={() => { props.getNewPage(page) }}>{page}</span>
   })

   return (
      <div className={s.users}>
         <div className={s.usersPagination}>
            {pagesList}
         </div>
         <ul className={s.usersList}>
            {usersItems}
         </ul>
      </div>
   )
}

export default Users