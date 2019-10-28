import React from 'react'
import { addMessageActionCreator, updateNewMessageTextActionCreator } from '../../redux/dialogs-reducer'
import Dialogs from './Dialogs'
import StoreContext from '../../StoreContext'

const DialogsContainer = () => {
   return <StoreContext.Consumer>{
         (store) => {
            let state = store.getState().dialogsPage

            let newMessage = () => {
               store.dispatch(addMessageActionCreator())
            }
            let onMessageChange = (text) => {
               store.dispatch(updateNewMessageTextActionCreator(text))
            }
            return <Dialogs dialogsData={state.dialogsData}
               messagesData={state.messagesData}
               newMessageText={state.newMessageText}

               newMessage={newMessage}
               onMessageChange={onMessageChange} />
         }
      }
   </StoreContext.Consumer>
}

export default DialogsContainer