import React, { useEffect } from 'react'
import { getDialogs, getMessages, sendMessage } from '../../redux/dialogs-reducer'
import Dialogs from './Dialogs'
import { connect } from 'react-redux'
import { withAuthRedirect } from '../Hoc/withAuthRedirect'
import { compose } from 'redux'
import { withRouter } from 'react-router-dom'

let DialogsContainer = (props) => {
   let { getDialogs, getMessages, match } = props

   useEffect(() => {
      getDialogs()
      if (match.params.userId) {
         getMessages(match.params.userId)
      }
   }, [])
   
   return (
      <Dialogs {...props} userId={match.params.userId} />
   )
}

let mapStateToProps = (state) => {
   return {
      dialogs: state.dialogsPage.dialogsData,
      messages: state.dialogsPage.messagesData
   }
}
export default compose( // compose (такой себе рекурсивный декоратор)
   connect(mapStateToProps, {
      getDialogs,
      getMessages,
      sendMessage
   }),
   withRouter,
   withAuthRedirect // HOC обёртка (редирект на login-page если не авторизован)
)(DialogsContainer)