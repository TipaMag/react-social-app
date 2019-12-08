import React from 'react'
import s from './ProfilePhoto.module.css'
import defaultUserImage from './../../../../assets/images/default-user-image.png'

const ProfilePhoto = (props) => {
    return (
        <div className={s.userPhoto}>
            <img src={props.profilePhoto != null ? props.profilePhoto : defaultUserImage} alt='profile_photo'></img>
        </div>
    )
}

export default ProfilePhoto