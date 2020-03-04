import React from 'react'
import Dialog from './Dialog/Dialog'
import Message from './Message/Message'
import AddMessageReduxForm from './DialogsForm/DialogsForm'
import { DialogsContainer, DialogsList, Messages, MessagesList } from './Dialogs.styles'
import { DialogType, MessagesDataType } from '../../types/Dialogs-types'

interface Props {
   dialogs: Array<DialogType>
   messages: MessagesDataType
   userId: number
   getMessages: (userId: number) => void
   sendMessage: (userId: number, messageBody: string) => void
}

const Dialogs: React.FC<Props> = ({dialogs, messages, userId, getMessages, sendMessage}) => {
   const addNewMessage = (values: any) => {
      sendMessage(userId, values.newMessageBody)
   }
   return (
      <DialogsContainer>
         <DialogsList>
            <ul>
               {dialogs.map(item =>
                  <Dialog key={item.id}
                     userId={item.id}
                     avatar={item.photos.small}
                     name={item.userName}
                     hasNewMessages={item.hasNewMessages}
                     newMessagesCount={item.newMessagesCount}
                     getMessages={getMessages}
                  />)
               }
            </ul>
         </DialogsList>
         <Messages>
            <MessagesList>
               <ul>
                  {messages.items.map(item =>
                     <Message key={item.id}
                        senderName={item.senderName}
                        message={item.body}
                        addedAt={item.addedAt}
                     />)
                  }
               </ul>
            </MessagesList>
            <AddMessageReduxForm onSubmit={addNewMessage} />
         </Messages>
      </DialogsContainer>
   )
}
export default Dialogs