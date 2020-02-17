import React from 'react'
import Navbar from './Navbar'
import { connect } from 'react-redux'

const NavbarContainer = (props) => {
  return (
    <Navbar {...props}/>
  )
}

let mapStateToProps = (state) => ({
  isAuth: state.auth.isAuth,
  friends: state.sidebar.friends,
  newMessagesCount: state.dialogsPage.newMessagesCount
})

export default connect(mapStateToProps,{
  
})(NavbarContainer)
