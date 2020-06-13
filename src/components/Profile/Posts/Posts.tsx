import React from 'react'
import styled from 'styled-components'
import { addPost } from '../../../redux/profile-reducer'
import { useDispatch, useSelector } from 'react-redux'
import Post from './Post/Post'
import AddPostReduxForm from './PostsForm/PostsForm'
import { AppStateType } from '../../../redux/redux-store'
import { PostValue } from './PostsForm/PostsForm'

const PostsList = styled.ul`
  list-style: none;
  margin: 0;
  padding: 0;
`

const Posts: React.FC = () => {

  const dispatch = useDispatch()
  const postsData = useSelector((state: AppStateType) => state.profilePage.postsData)
  
  let addNewPost = (value: PostValue) => {
    dispatch(addPost(value.newPostBody))
  }
  
  return (
    <div>
      <AddPostReduxForm onSubmit={addNewPost} />
      <PostsList>
        {postsData.map(post =>
          <Post key={post.id} message={post.message} likesCount={post.likesCount} />)
        }
      </PostsList>
    </div>
  )
}

export default Posts