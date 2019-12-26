import React from 'react'
import s from './Profile.module.css'
import ProfileInfo from './ProfileInfo/ProfileInfo'
import MyPostsContainer from './MyPosts/MyPostsContainer'

const Profile = (props) => {
  return (
    <div className={s.profile}>
      <ProfileInfo isOwner={props.isOwner}
                  profile={props.profile}
                  profileStatus={props.profileStatus}
                  updateProfileStatus={props.updateProfileStatus}
                  setProfilePhoto={props.setProfilePhoto}
                  onStartChatting={props.onStartChatting}/>
      <MyPostsContainer />
    </div>
  );
}

export default Profile