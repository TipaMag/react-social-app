import React, { useEffect, useRef } from "react"
import styled from 'styled-components'
import Dialog from "./Dialog/Dialog"
import Message from "./Message/Message"
import AddMessageReduxForm from "./DialogsForm/DialogsForm"
import { getDialogs, getMessages, clearMessages, sendMessage, removeMessage } from "./../../redux/dialogs-reducer"

import { useRouteMatch } from "react-router-dom"
import { AppStateType } from "../../redux/redux-store"
import { compose } from "redux"
import { useSelector, useDispatch } from "react-redux"
import { withAuthRedirect } from "../Hoc/withAuthRedirect"

export const DialogsContainer = styled.div`
   display: grid;
   grid-template-columns: 2fr 8fr;
   grid-gap: 10px;
   height: 500px;
`
export const DialogsList = styled.div`
   min-width: 220px;
   position: relative;
   & ul {
      position: absolute;
      top: 0%;
      left: 0%;
      right: 0%;
      bottom: 0%;
      list-style: none;
      margin: 0;
      padding: 0;
      padding-right: 5px;
      overflow-y: auto;
      &::-webkit-scrollbar-track {
         box-shadow: inset 0 0 6px rgba(0,0,0,0.3);
         border-radius: 10px;
         background-color: #F5F5F5;
      }
      &::-webkit-scrollbar {
         width: 7px;
         background-color: #F5F5F5;
      }
      &::-webkit-scrollbar-thumb {
         border-radius: 10px;
         box-shadow: inset 0 0 6px rgba(0,0,0,.3);
         background-color: var(--DARK-BLUE);
      }
   }
`
export const Messages = styled.div`
   display: flex;
   flex-flow: column;
`
export const MessagesList = styled.div`
   height: 100%;
   position: relative;
   margin-bottom: 10px;
   & ul {
      position: absolute;
      top: 0%;
      left: 0%;
      right: 0%;
      bottom: 0%;
      list-style: none;
      margin: 0;
      padding: 0px;
      padding-right: 5px;
      overflow-y: auto;
      &::-webkit-scrollbar-track {
         box-shadow: inset 0 0 6px rgba(0,0,0,0.3);
         border-radius: 10px;
         background-color: #F5F5F5;
      }
      &::-webkit-scrollbar {
         width: 7px;
         background-color: #F5F5F5;
      }
      &::-webkit-scrollbar-thumb {
         border-radius: 10px;
         box-shadow: inset 0 0 6px rgba(0,0,0,.3);
         background-color: var(--DARK-BLUE);
      }
   }
`

const Dialogs: React.FC = () => {
  const match = useRouteMatch<{ userId: string}>()
  const dispatch = useDispatch()

  const dialogs = useSelector((state: AppStateType) => state.dialogsPage.dialogsData)
  const messages = useSelector((state: AppStateType) => state.dialogsPage.messagesData)

  let userId: number = +match.params.userId
  let listRef = useRef<HTMLUListElement>(null)

  useEffect(() => {
    dispatch(getDialogs())
    if (userId) {
      dispatch(getMessages(userId))
    }
    return () => {
      dispatch(clearMessages())
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    scroll()
  }, [messages])

  const getMessagesHandler = (id: number) => dispatch(getMessages(id))
  const addNewMessage = (value: any) => dispatch(sendMessage(userId, value.newMessageBody)) 
  const onRemoveMessage = (messageId: string) => dispatch(removeMessage(messageId))
  const scroll = () => {
    if (listRef.current) {
      listRef.current.scrollBy(0, listRef.current.scrollHeight)
    } 
  }

  return (
    <DialogsContainer>
      <DialogsList>
        <ul>
          {dialogs.map(dialog => (
            <Dialog key={dialog.id}
              dialog={dialog}
              getMessagesHandler={getMessagesHandler}
            />
          ))}
        </ul>
      </DialogsList>
      <Messages>
        <MessagesList>
          <ul ref={listRef}>
            {messages.items.map(message => (
              <Message key={message.id}
                message={message}
                onRemoveMessage={onRemoveMessage}
              />
            ))}
          </ul>
        </MessagesList>
        <AddMessageReduxForm onSubmit={addNewMessage} />
      </Messages>
    </DialogsContainer>
  )
}

export default compose<React.ComponentType>(
  withAuthRedirect // hoc - redirect to login page if not authorized
)(Dialogs)