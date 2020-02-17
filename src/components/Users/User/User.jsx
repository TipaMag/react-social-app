import React from 'react'
import s from './User.module.css'
import { NavLink } from 'react-router-dom'
import defaultUserPhoto from '../../../assets/images/default-avatar-icon.png'
import Button from './../../../elements/Button'
import styled from 'styled-components'

let ListItem = styled.li`
   display: flex;
   justify-content: space-between;
   align-items: center;
   padding: 5px;
   border: 1px solid #ccc;
`

const User = ({userId, smallPhoto, name, status, followed, followingInProgress, onUnfollow, onFollow}) => {
   return (
      <ListItem id={userId}>
         <div className={s.userPhoto}>
            <NavLink to={'/profile/' + userId}>
               <img className={s.userAvatar} src={smallPhoto != null ? smallPhoto : defaultUserPhoto} alt='avatar'></img>
            </NavLink>
         </div>
         <div className={s.userInfo}>
            <span className={s.userInfoName}>{name}</span>
            <span className={s.userInfoTitle}>{status}</span>
         </div>
         <div className={s.followingBtn}>
            {followed
               ?  <Button disabled={followingInProgress.some(id => id === userId)} onClick={() => { onUnfollow(userId) }}>
                     unfollow
                  </Button>
               :  <Button disabled={followingInProgress.some(id => id === userId)} onClick={() => { onFollow(userId) }}>
                     follow
                  </Button>
            }
         </div>
      </ListItem>
   )
}
export default User