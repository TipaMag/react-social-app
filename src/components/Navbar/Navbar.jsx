import React from 'react'
import s from './Navbar.module.css'
import { NavLink } from 'react-router-dom'
import Friends from './Friends/Friends'

const Navbar = (props) => {
  let friendsElements = props.sidebar.friends.map(item => <Friends key={item.id} name={item.name} avatar={item.avatar} />)

  return <nav className={s.nav}>
    <ul className={s.navList}>
      <li className={s.item}>
        <NavLink to='/profile' activeClassName={s.active} >Profile</NavLink>
      </li>
      <li className={s.item}>
        <NavLink to='/dialogs' activeClassName={s.active}>Messages</NavLink>
      </li>
      <li className={s.item}>
        <NavLink to='/News' activeClassName={s.active}>News</NavLink>
      </li>
      <li className={s.item}>
        <NavLink to='/Music' activeClassName={s.active}>Music</NavLink>
      </li>
      <li className={s.item}>
        <NavLink to='/users' activeClassName={s.active}>users</NavLink>
      </li>
      <li className={s.item}>
        <NavLink to='/Settings' activeClassName={s.active}>Settings</NavLink>
      </li>
    </ul>
    <h3>Friends</h3>
    <ul className={s.friendsList}>
      {friendsElements}
    </ul>
  </nav>
}

export default Navbar