import React from 'react'
import Header from './Header'
import { logout } from '../../redux/auth-reducer'
import { connect } from 'react-redux'
import { compose } from 'redux'

const HeaderContainer = (props) => {
   return (
      <Header {...props}/>
   )
}

let mapStateToProps = (state) => ({
   login: state.auth.login,
   isAuth: state.auth.isAuth,
   smallPhoto: state.auth.smallPhoto
})
export default compose(
   connect(mapStateToProps, {
      logout
   })
)(HeaderContainer)