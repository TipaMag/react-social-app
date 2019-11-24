import React from 'react'
import Header from './Header'
import { getAuthUserData } from '../../redux/auth-reducer'
import { connect } from 'react-redux'
import { compose } from 'redux'

class HeaderContainer extends React.Component {
   componentDidMount() {
      this.props.getAuthUserData()
   }
   render() {
      return (
         <Header {...this.props} />
      )
   }
}

let mapStateToProps = (state) => ({
   login: state.auth.login,
   isAuth: state.auth.isAuth,
   smallPhoto: state.auth.smallPhoto
})

export default compose( // connect (такой себе рекурсивный декоратор)
   connect(mapStateToProps, {
      getAuthUserData //thunk
   })
)(HeaderContainer)

// export default connect(mapStateToProps, {
//    getAuthUserData //thunk
// })(HeaderContainer)