import React from 'react'
import s from './MyPosts.module.css'
import Post from './Post/Post'
import AddPostReduxForm from './MyPostForm/MyPostForm'


const MyPosts = (props) => {
  let postsElements = props.profilePage.postsData.map(item => <Post key={item.id} message={item.message} likesCount={item.likesCount} />)

  let addNewPost = (values) => {
    props.addPost(values.newPostBody)
  }

  return (
    <div className={s.postsBlock}>
      <h3>my posts</h3>
      <AddPostReduxForm onSubmit={addNewPost}/>
      <div className={s.posts}>
        {postsElements}
      </div>
    </div>
  )
}

export default MyPosts