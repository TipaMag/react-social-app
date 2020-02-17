import React from 'react';
import s from './Post.module.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faThumbsUp } from '@fortawesome/free-solid-svg-icons'
import defaultUserPhoto from '../../../../assets/images/default-avatar-icon.png'

const Post = (props) => {
   return (
      <li className={s.post}>
         <div className={s.postHeader}>
            <img className={s.postImage} src={defaultUserPhoto} alt='userPhoto'></img>
            <div className={s.postHeaderInfo}>
               <h5 className={s.postAuthor}>Andrey</h5>
               <span className={s.postDate}>17.03.2019</span>
            </div>
         </div>
         <div className={s.postContent}>
            <div className={s.postText}>
               {props.message}
            </div>
            <div className={s.likeWrap}>
               <FontAwesomeIcon className={s.likeIcon} icon={faThumbsUp} />
               <span className={s.likeCount}>
                  {props.likesCount}
               </span>
            </div>
         </div>
      </li>
   );
}

export default Post;