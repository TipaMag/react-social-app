import React, { useEffect } from 'react'
import { getDialogs, getMessages, sendMessage, setMessages } from '../../redux/dialogs-reducer'
import Dialogs from './Dialogs'
import { connect } from 'react-redux'
import { withAuthRedirect } from '../Hoc/withAuthRedirect'
import { compose } from 'redux'
import { withRouter } from 'react-router-dom'

const DialogsContainer = (props) => {
   let { getDialogs, getMessages, match, setMessages } = props
   let userId = match.params.userId

   useEffect(() => {
      console.log('firsUseEffect')
      getDialogs()
      if (userId) {
         getMessages(userId)
      }
      return () => {
         console.log('UnmountUseEffect')
         setMessages([])
      }
   }, [])
   
   return (
      <Dialogs {...props} userId={userId} />
   )
}

let mapStateToProps = (state) => ({
   dialogs: state.dialogsPage.dialogsData,
   messages: state.dialogsPage.messagesData
})
export default compose(
   connect(mapStateToProps, {
      getDialogs,
      getMessages,
      sendMessage,

      setMessages // actionCreator*
   }),
   withRouter,
   withAuthRedirect // HOC обёртка (редирект на login-page если не авторизован)
)(DialogsContainer)