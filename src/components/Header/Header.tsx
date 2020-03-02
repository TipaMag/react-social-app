import React, { useState } from 'react'
import { connect } from 'react-redux'
import { compose } from 'redux'
import { Link } from 'react-router-dom'
import defaultUserImage from '../../assets/images/default-user-image.png'
import s from './Header.module.css'
import Clock from '../common/Clock/Clock'

import { logout } from '../../redux/auth-reducer'
import { AppStateType } from '../../redux/redux-store'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAngleDown } from '@fortawesome/free-solid-svg-icons'

type Props = MapStateProps & MapDispatchProps
const Header: React.FC<Props> = ({ isAuth, login, smallPhoto, logout }) => {
   let [toggleMode, setToggleMode] = useState<boolean>(false)

   const handleToggleMenu = () => {
      setToggleMode(!toggleMode)
   }
   return (
      <header className={s.header}>
         <Clock />
         {isAuth
            ? <div className={s.autorize} onClick={handleToggleMenu}>
                  <span className={s.userName}>{login}</span>
                  <img className={s.userImage} src={smallPhoto || defaultUserImage} alt='userImg'></img>
                  <FontAwesomeIcon icon={faAngleDown} />
                  {toggleMode &&
                     <ul className={s.autorizeMenu}>
                        <li className={s.menuItem}>
                           <Link onClick={logout} to='/login' >logout</Link>
                        </li>
                        <li className={s.menuItem}>
                           <Link to='/profile/edit' >edit profile</Link>
                        </li>
                     </ul>
                  }
               </div>
            : <Link className={s.loginBtn} to='/login' >Login</Link>
         }
      </header>
   );
}

interface MapStateProps {
   login: string | null
   isAuth: boolean
   smallPhoto: string | null
}
interface MapDispatchProps {
   logout: () => void
}
let mapStateToProps = (state: AppStateType ): MapStateProps => ({
   login: state.auth.login,
   isAuth: state.auth.isAuth,
   smallPhoto: state.auth.smallPhoto
})
export default compose(
   connect<MapStateProps, MapDispatchProps, null, AppStateType>(mapStateToProps, {
      logout
   })
)(Header)