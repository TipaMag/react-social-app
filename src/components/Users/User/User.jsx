import React from 'react'
import s from './User.module.css'
import { NavLink } from 'react-router-dom'
import defaultUserPhoto from '../../../assets/images/default-avatar-icon.png'

const User = (props) => {
   return (
      <li className={s.item} id={props.id}>
         <div>
            <NavLink to={'/profile/' + props.id}>
               <img className={s.userAvatar} src={props.smallPhoto != null ? props.smallPhoto : defaultUserPhoto} alt='avatar'></img>
            </NavLink>
            <div>
               {props.followed
                  ? <button disabled={props.followingInProgress.some(id => id === props.id)} onClick={() => { props.onUnfollow(props.id) }}>
                     unfollow
                     </button>
                  : <button disabled={props.followingInProgress.some(id => id === props.id)} onClick={() => { props.onFollow(props.id) }}>
                     follow
                     </button>}
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