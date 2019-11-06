import React from 'react';
import s from './Dialogs.module.css';
import Dialog from './Dialog/Dialog';
import Message from './Message/Message'

const Dialogs = (props) => {
   let dialogsElements = props.dialogsPage.dialogsData.map(item => <Dialog key={item.id} id={item.id} avatar={item.avatar} name={item.name}  />)
   let messagesElements = props.dialogsPage.messagesData.map(item => <Message key={item.id} message={item.message} />)

   let onAddMessage = () => {
      props.sendMessage()
   }
   let onMessageChange = (event) => {
      let text = event.target.value
      props.updateNewMessageText(text)
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
               <textarea onChange={onMessageChange} value={props.dialogsPage.newMessageText} placeholder='Enter you message'> </textarea>
               <button onClick={onAddMessage}>Add message</button>
            </div>
         </div>
      </div>
   )
}

export default Dialogs