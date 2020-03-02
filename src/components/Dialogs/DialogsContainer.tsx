import React, { useEffect } from 'react'
import { getDialogs, getMessages, clearMessages, sendMessage } from '../../redux/dialogs-reducer'
import Dialogs from './Dialogs'
import { connect } from 'react-redux'
import { withAuthRedirect } from '../Hoc/withAuthRedirect'
import { compose } from 'redux'
import { withRouter, RouteComponentProps } from 'react-router-dom'

import { DialogType, MessagesDataType } from '../../types/Dialogs-types'
import { AppStateType } from '../../redux/redux-store'
import { AppActionTypes } from '../../types/actions'

type Props = MapStateProps & MapDispatchProps & MyCustomProps & RouteComponentProps<{ userId: string}>
const DialogsContainer: React.FC<Props> = (props) => {
   let {match, getDialogs, getMessages, clearMessages} = props
   let userId: number | undefined = +match.params.userId

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

   return (
      <Dialogs {...props} userId={userId}/>
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
   }),
   withRouter,
   withAuthRedirect // hoc - redirect to login page if not authorized
)(DialogsContainer)