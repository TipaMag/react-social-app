import React from 'react'
import s from './MyPosts.module.css'
import Post from './Post/Post'
import AddPostReduxForm from './MyPostForm/MyPostForm'


const MyPosts = ({ postsData, addPost }) => {

  let addNewPost = (values) => {
    addPost(values.newPostBody)
  }
  return (
    <div className={s.postsWrapper}>
      <AddPostReduxForm onSubmit={addNewPost} />
      <ul className={s.postsList}>
        {postsData.map(item =>
          <Post key={item.id} message={item.message} likesCount={item.likesCount} />)
        }
      </ul>
    </div>
  )
}

export default MyPosts