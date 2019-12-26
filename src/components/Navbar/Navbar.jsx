import React from 'react'
import s from './Navbar.module.css'
import { NavLink } from 'react-router-dom'
import Friends from './Friends/Friends'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHome, faComments, faUsers, faNewspaper, faMusic, faCogs } from '@fortawesome/free-solid-svg-icons'
import Counter from './../common/Counter/Counter'

const Navbar = ({ friends, newMessagesCount }) => {

  return (
    <nav className={s.nav}>
      <ul className={s.navList}>
        <li className={s.item}>
          <NavLink to='/profile' activeClassName={s.active}><FontAwesomeIcon icon={faHome} />Profile</NavLink>
        </li>
        <li className={s.item}>
          <NavLink to='/dialogs' activeClassName={s.active}><FontAwesomeIcon icon={faComments} />Messages
            {newMessagesCount > 0 && <Counter count={newMessagesCount} />}
          </NavLink>
        </li>
        <li className={s.item}>
          <NavLink to='/users' activeClassName={s.active}><FontAwesomeIcon icon={faUsers} />users</NavLink>
        </li>
        <li className={s.item}>
          <NavLink to='/News' activeClassName={s.active}><FontAwesomeIcon icon={faNewspaper} />News</NavLink>
        </li>
        <li className={s.item}>
          <NavLink to='/Music' activeClassName={s.active}><FontAwesomeIcon icon={faMusic} />Music</NavLink>
        </li>
        <li className={s.item}>
          <NavLink to='/Settings' activeClassName={s.active}><FontAwesomeIcon icon={faCogs} />Settings</NavLink>
        </li>
      </ul>
      <h3>Friends</h3>
      <ul className={s.friendsList}>
        {friends.map(item =>
          <Friends key={item.id} name={item.name} avatar={item.avatar} />)
        }
      </ul>
    </nav>
  )
}

export default Navbar