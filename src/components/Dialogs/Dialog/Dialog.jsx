import React from 'react'
import s from './Dialog.module.css'
import defaultUserImage from '../../../assets/images/default-user-image.png'
import { NavLink } from 'react-router-dom'

const Dialog = ({userId, avatar, name, hasNewMessages, newMessagesCount, getMessages}) => {
   let path = '/dialogs/' + userId

   const getUserMessages = () => {
      getMessages(userId)
   }
   return (
      <li className={s.dialogWrap}>
         <NavLink activeClassName={s.active} to={path} onClick={getUserMessages}>
            <div className={s.dialogPhoto}>
               <img src={avatar || defaultUserImage} alt='avatar'></img>
            </div>
            <div className={s.dialogMessageWrap}>
               <span className={s.userName}>{name}</span>
            </div>
            <div className={s.dialogMeta}>
               { hasNewMessages && 
                  <span className={s.newMessagesCount}>{newMessagesCount}</span>
               }
            </div>
         </NavLink>
      </li>
   )
}

export default Dialog