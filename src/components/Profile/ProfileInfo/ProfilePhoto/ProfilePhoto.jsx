import React from 'react'
import s from './ProfilePhoto.module.css'
import defaultUserImage from './../../../../assets/images/default-user-image.png'
import FileInput from './ProfilePhotoLoadInput/ProfilePhotoLoadInput'

const ProfilePhoto = ({ profilePhoto, isOwner, setProfilePhoto }) => {
    return (
        <div className={s.userPhotoContainer}>
            <img src={profilePhoto || defaultUserImage} alt='profile_photo'></img>
            {isOwner &&
                <FileInput setProfilePhoto={setProfilePhoto} />
            }
        </div>
    )
}

export default ProfilePhoto