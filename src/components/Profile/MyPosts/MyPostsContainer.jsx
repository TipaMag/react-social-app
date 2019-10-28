import React from 'react'
import { addPostActionCreator, updateNewPostTextActionCreator } from '../../../redux/profile-reducer'
import MyPosts from './MyPosts'
import StoreContext from '../../../StoreContext'

const MyPostsContainer = () => {
  return <StoreContext.Consumer>{
      (store) => {
        let state = store.getState().profilePage
        let newPost = () => {
          store.dispatch(addPostActionCreator())
        }
        let onPostChange = (text) => {
          store.dispatch(updateNewPostTextActionCreator(text))
        }
        return <MyPosts postsData={state.postsData}
          newPostText={state.newPostText}
          addPost={newPost}
          updateNewPostText={onPostChange} />
      }
    }
  </StoreContext.Consumer>
}

export default MyPostsContainer