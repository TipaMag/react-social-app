import React from 'react'
import s from './Header.module.css'
import Clock from './Clock/Clock'
import { NavLink } from 'react-router-dom'
import defaultUserImage from '../../assets/images/default-user-image.png'

const Header = (props) => {
   return (
      <header className={s.header}>
         <img className={s.headerLogo} src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR6hIhoCOwJSxZkDCwwPot9ql1mwwjenBu7z68zKaRUzFvnZ_Hp8Q' alt='headerImg'></img>
         <Clock />
         <div className={s.loginBlock}>
            {
               props.isAuth ?
                  <div>
                     <img className={s.loginImage} src={props.smallPhoto ? props.smallPhoto: defaultUserImage} alt=''></img>
                     <span>{props.login}</span>
                  </div> :
                  <NavLink to='/login' >Login</NavLink>
            }
         </div>
      </header>
   );
}

export default Header