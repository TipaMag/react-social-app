import React from 'react'
import s from './MyPosts.module.css'
import Post from './Post/Post'


const MyPosts = (props) => {
  let postsElements = props.profilePage.postsData.map(item => <Post key={item.id} message={item.message} likesCount={item.likesCount} />)

  let onPostChange = (event) => {
    let text = event.target.value
    props.updateNewPostText(text)
  }
  let onAddPost = () => {
    props.addPost()
  }

  return (
    <div className={s.postsBlock}>
      <h3>my posts</h3>
      <div className={s.addPostBlock}>
        <textarea onChange={onPostChange} value={props.profilePage.newPostText} />
        <button onClick={onAddPost}>Add post</button>
      </div>
      <div className={s.posts}>
        {postsElements}
      </div>
    </div>
  );
}

export default MyPosts