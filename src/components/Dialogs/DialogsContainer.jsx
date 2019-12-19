import React from 'react'
import { getDialogs, getMessages, sendMessage } from '../../redux/dialogs-reducer'
import Dialogs from './Dialogs'
import { connect } from 'react-redux'
import { withAuthRedirect } from '../Hoc/withAuthRedirect'
import { compose } from 'redux'
import { withRouter } from 'react-router-dom'

class DialogsContainer extends React.Component {
   componentDidMount() {
      this.props.getDialogs()
      if (this.props.match.params.userId) {
         this.props.getMessages(this.props.match.params.userId)
      }
   }
   render() {
      return (
         <Dialogs {...this.props} userId={this.props.match.params.userId}/>
      )
   }
}

let mapStateToProps = (state) => {
   return {
      dialogsPage: state.dialogsPage
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



// let AuthRedirectComponent = withAuthRedirect(DialogsContainer) // HOC обёртка (редирект на login-page если не авторизован)
// export default connect(mapStateToProps, {
//    updateNewMessageText, // actionCreator
//    addMessage // actionCreator
// })(AuthRedirectComponent)

// let mapDispatchToProps = (dispatch) => {
//    return {
//       updateNewMessageText: (text) => {
//          dispatch(updateNewMessageTextActionCreator(text))
//       },
//       sendMessage: () => {
//          dispatch(addMessageActionCreator())
//       }
//    }
// }