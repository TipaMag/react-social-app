import React, { useState } from 'react'
import s from './Header.module.css'
import Clock from './Clock/Clock'
import { NavLink } from 'react-router-dom'
// import socialNetworkLogo from '../../assets/images/social-network-logo.jpg'
import defaultUserImage from '../../assets/images/default-user-image.png'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAngleDown } from '@fortawesome/free-solid-svg-icons'

const Header = ({ isAuth, login, smallPhoto, logout }) => {

   let [toggleMode, setToggleMode] = useState(false)
   const toggleAutorizeMenu = () => {
      setToggleMode(!toggleMode)
   }


   return (
      <header className={s.header}>
         {/* <div className={s.headerLogo}>
            <img src={socialNetworkLogo} alt='headerImg'></img>
         </div> */}
         <Clock />
         {isAuth
            ? <div onClick={toggleAutorizeMenu} className={s.autorize}>
                  <span className={s.userName}>{login}</span>
                  <img className={s.userImage} src={smallPhoto || defaultUserImage} alt='userImg'></img>
                  <FontAwesomeIcon icon={faAngleDown} />
                  {toggleMode &&
                     <ul className={s.autorizeMenu}>
                        <li className={s.menuItem}>
                           <NavLink onClick={logout} to='/login' >logout</NavLink>
                        </li>
                        <li className={s.menuItem}>
                           <NavLink to='/profile/edit' >edit profile</NavLink>
                        </li>
                     </ul>
                  }
               </div>
            : <NavLink className={s.loginBtn} to='/login' >Login</NavLink>
         }
      </header>
   );
}

export default Header