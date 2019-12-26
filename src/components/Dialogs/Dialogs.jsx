import React from 'react'
import s from './Dialogs.module.css'
import Dialog from './Dialog/Dialog'
import Message from './Message/Message'
import AddMessageReduxForm from './DialogsForm/DialogsForm'


const Dialogs = (props) => {
   let {dialogs, messages, getMessages, sendMessage, userId } = props

   let dialogsElements = dialogs.map(item =>
      <Dialog key={item.id}
         userId={item.id}
         avatar={item.photos.small}
         name={item.userName}
         hasNewMessages={item.hasNewMessages}
         newMessagesCount={item.newMessagesCount}
         getMessages={getMessages}/>)
   let messagesElements = messages.items && messages.items.map(item =>
      <Message key={item.id}
         senderName={item.senderName}
         message={item.body}
         addedAt={item.addedAt} />)

   const addNewMessage = (values) => {
      sendMessage(userId, values.newMessageBody)
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
            <AddMessageReduxForm onSubmit={addNewMessage} />
         </div>
      </div>
   )
}

export default Dialogs


/* <div className={s.addMessage}>
   <textarea onChange={(event) => { props.onMessageChange(event) }} value={props.dialogsPage.newMessageText} placeholder='Enter you message...'> </textarea>
   <button onClick={() => { props.onAddMessage() }}>Add message</button>
</div> */