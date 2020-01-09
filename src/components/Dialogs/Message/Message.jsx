import React from 'react'
import s from './Message.module.css'
import DateTime from '../../common/DateTime/DateTime'

const Message = ({senderName, message, addedAt}) => {
   return (
      <li className={s.message}>
         <span className={s.senderName}>{senderName}</span>
         <span className={s.senderMessage}>{message}</span>
         <DateTime addedAt={addedAt}/>
      </li>
   )
}
export default Message