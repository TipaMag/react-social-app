import React from 'react';
import s from './Dialog.module.css';
import { NavLink } from 'react-router-dom';

const Dialog = (props) => {
   let path = '/dialogs/' + props.id;

   return (
      <li className={s.dialog}>
         <NavLink activeClassName={s.active} to={path}>
            <img src={props.avatar}></img>
            {props.name}
         </NavLink>
      </li>
   )
}

export default Dialog