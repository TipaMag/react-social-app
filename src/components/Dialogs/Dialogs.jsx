import React from 'react';
import s from './Dialogs.module.css';
import Dialog from './Dialog/Dialog';
import Message from './Message/Message'

const Dialogs = (props) => {
   let dialogsElements = props.dialogsData.map(item => <Dialog avatar={item.avatar} name={item.name} id={item.id} />)
   let messagesElements = props.messagesData.map(item => <Message message={item.message} />)

   let onAddMessage = () => {
      props.newMessage()
   }
   let onMessageChange = (event) => {
      let text = event.target.value
      props.onMessageChange(text)
   }

   return (
      <div className={s.dialogs}>
         <ul className={s.dialogsList}>
            {dialogsElements}
         </ul>
         <div className={s.messages}>
            <ul className={s.messagesList}>
               {messagesElements}
            </ul>
            <div className={s.addMessage}>
               <textarea onChange={onMessageChange} value={props.newMessageText} placeholder='Enter you message'> </textarea>
               <button onClick={onAddMessage}>Add message</button>
            </div>
         </div>
      </div>
   )
}

export default Dialogs