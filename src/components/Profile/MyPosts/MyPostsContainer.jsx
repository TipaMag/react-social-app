// import React from 'react'
import { addPost, updateNewPostText } from '../../../redux/profile-reducer'
import MyPosts from './MyPosts'
import { connect } from 'react-redux'

let mapStateToProps = (state) => {
  return {
    profilePage: state.profilePage
  }
}

const MyPostsContainer = connect(mapStateToProps, {
  addPost, //actionCreator
  updateNewPostText //actionCreator
})(MyPosts)

export default MyPostsContainer



// let mapDispatchToProps = (dispatch) => {
//   return {
//     updateNewPostText: (text) => {
//       dispatch(updateNewPostTextActionCreator(text))
//     },
//     newPost: () => {
//       dispatch(addPostActionCreator())
//     }
//   }
// }