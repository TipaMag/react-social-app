import React from 'react';
import s from './Profile.module.css';
import MyPosts from './MyPosts/MyPosts';

const Profile = () => {
  return (
    <div>
      <div>
        <img src='http://wowslider.com/sliders/demo-81/data1/images/redkite50498.jpg'></img>
      </div>
      <div>
        <img src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR0GcvltEcK8FCzX_72ZsFqVLHJ7DjHKFViaLIais7bIkHdpq_-'></img>
      </div>
      <MyPosts />
    </div>
  );
}

export default Profile;