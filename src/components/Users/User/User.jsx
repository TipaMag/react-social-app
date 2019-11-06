import React from 'react'
import s from './User.module.css'
import userPhoto from '../../../assets/images/avatar-icon.png'

const User = (props) => {
   return (
      <li className={s.item} id={props.id}>
         <div>
            <img className={s.userAvatar} src={props.smallPhoto != null ? props.smallPhoto : userPhoto} alt='avatar'></img>
            <div>
               {props.followed ?
                  <button onClick={() => { props.unfollowUser(props.id) }}>unfollow</button> :
                  <button onClick={() => { props.followUser(props.id) }}>follow</button>}
            </div>
         </div>
         <div>
            <div>
               <span>{props.name}</span>
               <span>{props.status}</span>
            </div>
            <div>
               {/* <span>{item.location.country}</span> */}
               {/* <span>{item.location.city}</span> */}
            </div>
         </div>
      </li>
   )
}

export default User