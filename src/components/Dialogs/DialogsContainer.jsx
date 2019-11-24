import React from 'react'
import { addMessage, updateNewMessageText } from '../../redux/dialogs-reducer'
import Dialogs from './Dialogs'
import { connect } from 'react-redux'
import { withAuthRedirect } from '../Hoc/withAuthRedirect'
import { compose } from 'redux'

class DialogsContainer extends React.Component {
   onAddMessage = () => {
      this.props.addMessage()
   }
   onMessageChange = (event) => {
      let text = event.target.value
      this.props.updateNewMessageText(text)
   }
   render() {
      return (
         <Dialogs {...this.props}
                  onAddMessage={this.onAddMessage}
                  onMessageChange={this.onMessageChange}/>
      )
   }
}

let mapStateToProps = (state) => {
   return {
      dialogsPage: state.dialogsPage
   }
}
export default compose( // connect (такой себе рекурсивный декоратор)
   connect(mapStateToProps, {
      updateNewMessageText, // actionCreator
      addMessage // actionCreator
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