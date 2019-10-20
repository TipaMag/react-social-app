import React from 'react';
import s from './Dialogs.module.css';
import Dialog from './Dialog/Dialog';
import Message from './Message/Message'

const Dialogs = (props) => {
   let dialogsElements = props.state.dialogsData.map(item => <Dialog avatar={item.avatar} name={item.name} id={item.id} />)
   let messagesElements = props.state.messagesData.map(item => <Message message={item.message} />)

   let newMessageArea = React.createRef();
   let addMessage = () => {
      if(newMessageArea.current.value) {
         alert(newMessageArea.current.value)
       }
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
               <textarea ref={newMessageArea}></textarea>
               <button onClick={addMessage}>Add message</button>
            </div>
         </div>
      </div>
   )
}

export default Dialogs