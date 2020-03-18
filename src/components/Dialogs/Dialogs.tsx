import React, { useEffect } from "react"
import Dialog from "./Dialog/Dialog"
import Message from "./Message/Message"
import AddMessageReduxForm from "./DialogsForm/DialogsForm"
import {
  DialogsContainer,
  DialogsList,
  Messages,
  MessagesList
} from "./Dialogs.styles"
import {
  getDialogs,
  getMessages,
  clearMessages,
  sendMessage,
  removeMessage
} from "./../../redux/dialogs-reducer"
import { DialogType, MessagesDataType } from "../../types/Dialogs-types"
import { RouteComponentProps, withRouter } from "react-router-dom"
import { AppActionTypes } from "../../types/actions"
import { AppStateType } from "../../redux/redux-store"
import { compose } from "redux"
import { connect } from "react-redux"
import { withAuthRedirect } from "../Hoc/withAuthRedirect"

type Props = MapStateProps &
  MapDispatchProps &
  MyCustomProps &
  RouteComponentProps<{ userId: string }>
const Dialogs: React.FC<Props> = ({
  dialogs,
  messages,
  getDialogs,
  getMessages,
  clearMessages,
  sendMessage,
  removeMessage,
  match
}) => {
  let userId: number = +match.params.userId
  useEffect(() => {
    getDialogs()
    if (userId) {
      getMessages(userId)
    }
    return () => {
      clearMessages()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const addNewMessage = (values: any) => {
    sendMessage(userId, values.newMessageBody)
  }

  const onRemoveMessage = (messageId: string) => {
     removeMessage(messageId)
  }
  return (
    <DialogsContainer>
      <DialogsList>
        <ul>
          {dialogs.map(item => (
            <Dialog
              key={item.id}
              userId={item.id}
              avatar={item.photos.small}
              name={item.userName}
              hasNewMessages={item.hasNewMessages}
              newMessagesCount={item.newMessagesCount}
              getMessages={getMessages}
            />
          ))}
        </ul>
      </DialogsList>
      <Messages>
        <MessagesList>
          <ul>
            {messages.items.map(item => (
              <Message
                key={item.id}
                messageId={item.id}
                senderName={item.senderName}
                message={item.body}
                addedAt={item.addedAt}
                onRemoveMessage={onRemoveMessage}
              />
            ))}
          </ul>
        </MessagesList>
        <AddMessageReduxForm onSubmit={addNewMessage}/>
      </Messages>
    </DialogsContainer>
  )
}

interface MyCustomProps {
  isAuth: boolean // from hoc 'withAuthRedirect'
}
interface MapStateProps {
  dialogs: Array<DialogType>
  messages: MessagesDataType
}
interface MapDispatchProps {
  getDialogs: () => void
  getMessages: (userId: number) => void
  clearMessages: () => AppActionTypes
  sendMessage: (userId: number, messageBody: string) => void
  removeMessage: (messageId: string) => void
}
const mapStateToProps = (state: AppStateType) => ({
  dialogs: state.dialogsPage.dialogsData,
  messages: state.dialogsPage.messagesData
})
export default compose(
  connect<MapStateProps, MapDispatchProps, {}, AppStateType>(mapStateToProps, {
    getDialogs,
    getMessages,
    clearMessages,
    sendMessage,
    removeMessage
  }),
  withRouter,
  withAuthRedirect // hoc - redirect to login page if not authorized
)(Dialogs)