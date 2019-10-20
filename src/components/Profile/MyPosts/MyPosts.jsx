import React from 'react';
import s from './MyPosts.module.css';
import Post from './Post/Post';


const MyPosts = (props) => {
  let postsElements = props.postsData.map(item => <Post message={item.message} likesCount={item.likesCount} />);

  let newPostArea = React.createRef();
  let newPost = () => {
    let text = newPostArea.current.value;
    if(text) {
      props.addPost(text);
      newPostArea.current.value = '';
    }
  };

  return (
    <div className={s.postsBlock}>
      <h3>my posts</h3>
      <div className={s.addPostBlock}>
        <textarea ref={newPostArea}></textarea>
        <button onClick={newPost}>Add post</button>
      </div>
      <div className={s.posts}>
        {postsElements}
      </div>
    </div>
  );
}

export default MyPosts;