import React from 'react'
import s from './Navbar.module.css'
import { NavLink } from 'react-router-dom'
import Friends from './Friends/Friends'
import StoreContext from '../../StoreContext'

const Navbar = () => {
  return <StoreContext.Consumer>{
    (store) => {
      let state = store.getState()
      let friendsElements = state.sidebar.friends.map( item => <Friends name={item.name} avatar={item.avatar} /> )

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
              <NavLink to='/Settings' activeClassName={s.active}>Settings</NavLink>
            </li>
          </ul>
          <h3>Friends</h3>
          <ul className={s.friendsList}>
            {friendsElements}
          </ul>
        </nav>
    }
  }
  </StoreContext.Consumer> 
}

export default Navbar