import React from 'react';
import s from './Friends.module.css';

interface Props {
  name: string
  avatar: string
}
const FriendsElement: React.FC<Props> = ({name, avatar}) => {
  return (
    <li className={s.item}>
      <a href='#/'>
        <img src={avatar} alt='img'></img>
        {name}
      </a>
    </li>
  )
}

export default FriendsElement;