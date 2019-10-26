import React from 'react';
import s from './MyPosts.module.css';
import Post from './Post/Post';
import { addPostActionCreator, updateNewPostTextActionCreator } from '../../../redux/profile-reducer';



const MyPosts = (props) => {
  let postsElements = props.postsData.map(item => <Post message={item.message} likesCount={item.likesCount} />);

  let newPost = () => {
    props.dispatch(addPostActionCreator())
  }
  let onPostChange = (event) => {
    let text = event.target.value;
    props.dispatch(updateNewPostTextActionCreator(text))
  }

  return (
    <div className={s.postsBlock}>
      <h3>my posts</h3>
      <div className={s.addPostBlock}>
        <textarea onChange={onPostChange}value={props.newPostText} />
        <button onClick={newPost}>Add post</button>
      </div>
      <div className={s.posts}>
        {postsElements}
      </div>
    </div>
  );
}

export default MyPosts;