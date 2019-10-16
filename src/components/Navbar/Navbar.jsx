import React from 'react';
import s from './Navbar.module.css';

const Navbar = () => {
  return (
    <nav className={s.nav}>
      <ul>
        <li className={`${s.item} ${s.active}`}><a href='/profile'>Profile</a></li>
        <li className={s.item}><a href='/dialogs'>Messages</a></li>
        <li className={s.item}><a href='/News'>News</a></li>
        <li className={s.item}><a href='/Music'>Music</a></li>
        <li className={s.item}><a href='/Settings'>Settings</a></li>
      </ul>
    </nav>
  );
}

export default Navbar;