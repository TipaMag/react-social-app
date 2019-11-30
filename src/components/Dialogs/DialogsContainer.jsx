import React from 'react'
import { sendMessage } from '../../redux/dialogs-reducer'
import Dialogs from './Dialogs'
import { connect } from 'react-redux'
import { withAuthRedirect } from '../Hoc/withAuthRedirect'
import { compose } from 'redux'

class DialogsContainer extends React.Component {
   render() {
      return (
         <Dialogs {...this.props}/>
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
      sendMessage // actionCreator
   }),
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