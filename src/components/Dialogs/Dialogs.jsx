import React from 'react';
import s from './Dialogs.module.css';
import Dialog from './Dialog/Dialog';
import Message from './Message/Message'

const Dialogs = (props) => {
   let dialogsElements = props.dialogsPage.dialogsData.map(item => <Dialog avatar={item.avatar} name={item.name} id={item.id} />)
   let messagesElements = props.dialogsPage.messagesData.map(item => <Message message={item.message} />)

   let newMessageArea = React.createRef();
   let newMessage = () => {
      props.addMessage();
   }
   let onMessageChange = () => {
      let text = newMessageArea.current.value
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
               <textarea onChange={onMessageChange} ref={newMessageArea} value={props.dialogsPage.newMessageText}></textarea>
               <button onClick={newMessage}>Add message</button>
            </div>
         </div>
      </div>
   )
}

export default Dialogs