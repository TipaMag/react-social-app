import React from 'react';
import s from './Post.module.css'
import defaultUserPhoto from '../../../../assets/images/default-avatar-icon.png'

const Post = (props) => {
   return (
      <div className={s.item}>
         <img src={defaultUserPhoto} alt='avatar'></img>
         <p>
            {props.message}
         </p>
         <div>
            <span>{props.likesCount} like</span>
         </div>
      </div>
   );
}

export default Post;