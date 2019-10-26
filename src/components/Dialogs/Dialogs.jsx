import React from 'react';
import s from './Dialogs.module.css';
import Dialog from './Dialog/Dialog';
import Message from './Message/Message'
import { addMessageActionCreator, updateNewMessageTextActionCreator } from '../../redux/dialogs-reducer';

const Dialogs = (props) => {
   let dialogsElements = props.dialogsPage.dialogsData.map(item => <Dialog avatar={item.avatar} name={item.name} id={item.id} />)
   let messagesElements = props.dialogsPage.messagesData.map(item => <Message message={item.message} />)

   let newMessage = () => {
      props.dispatch(addMessageActionCreator())
   }
   let onMessageChange = (event) => {
      let text = event.target.value
      props.dispatch(updateNewMessageTextActionCreator(text))
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
               <button onClick={newMessage}>Add message</button>
            </div>
         </div>
      </div>
   )
}

export default Dialogs