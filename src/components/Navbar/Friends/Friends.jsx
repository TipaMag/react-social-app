import React from 'react';
import s from './Friends.module.css';
// import { NavLink } from 'react-router-dom';

const Friends = (props) => {
  // debugger;
  return (
    <li className={s.item}>
      <a href='#/'>
        <img src={props.avatar} alt='img'></img>
        {props.name}
      </a>
    </li>
  )
}

export default Friends;