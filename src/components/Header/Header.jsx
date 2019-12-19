import React from 'react'
import s from './Header.module.css'
import Clock from './Clock/Clock'
import { NavLink } from 'react-router-dom'
// import socialNetworkLogo from '../../assets/images/social-network-logo.jpg'
import defaultUserImage from '../../assets/images/default-user-image.png'

const Header = ({ isAuth, login, smallPhoto, logout }) => {
   return (
      <header className={s.header}>
         {/* <div className={s.headerLogo}>
            <img src={socialNetworkLogo} alt='headerImg'></img>
         </div> */}
         <Clock />
         {
            isAuth
               ? <div className={s.autorize}>
                  <span className={s.userName}>{login}</span>
                  <img src={smallPhoto || defaultUserImage} alt='userImg'></img>
                  <button onClick={logout}>logout</button>
               </div>
               : <NavLink className={s.loginBtn} to='/login' >Login</NavLink>
         }
      </header>
   );
}

export default Header