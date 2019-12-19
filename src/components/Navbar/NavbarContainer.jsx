import React, { useEffect } from 'react'
import Navbar from './Navbar'
import { connect } from 'react-redux'
import { getNewMessagesCount } from '../../redux/sidebar-reducer'

const NavbarContainer = (props) => {

  useEffect( () => {
    props.getNewMessagesCount()
  }, [props.newMessagesCount])

  return (
    <Navbar {...props}/>
  )
}

let mapStateToProps = (state) => ({
    friends: state.sidebar.friends,
    newMessagesCount: state.sidebar.newMessagesCount
})

export default connect(mapStateToProps,{
  getNewMessagesCount
})(NavbarContainer)
