import React from 'react';
import s from './Message.module.css';
import DateTime from '../../common/DateTime/DateTime';

const Message = (props) => {
   return (
      <li className={s.message}>
         <span className={s.senderName}>{props.senderName}</span>
         <span className={s.senderMessage}>{props.message}</span>
         <DateTime addedAt={props.addedAt}/>
      </li>
   )
}

export default Message