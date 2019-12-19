import React from 'react';
import s from './Message.module.css';

const Message = (props) => {
   return (
   <li className={s.message}><b>{props.senderName}</b>{props.message}</li>
   )
}

export default Message