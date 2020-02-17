import React from 'react'
import { addPost } from '../../../redux/profile-reducer'
import MyPosts from './MyPosts'
import { connect } from 'react-redux'

const MyPostsContainer = (props) => {
  return (
    <MyPosts {...props}/>
  )
}

let mapStateToProps = (state) => ({
  postsData: state.profilePage.postsData
})
export default connect(mapStateToProps, {
  addPost
})(MyPostsContainer)