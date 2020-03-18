import React from "react"
import s from "./Navbar.module.css"
import { NavLink } from "react-router-dom"
import FriendsElement from "./Friends/Friends"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import {
  faHome,
  faComments,
  faUsers,
  faNewspaper,
  faMusic,
  faCogs
} from "@fortawesome/free-solid-svg-icons"
import Counter from "../common/Counter/Counter"
import { Friends } from "../../redux/sidebar-reducer"
import { connect } from "react-redux"
import { AppStateType } from "../../redux/redux-store"

type Props = MapStateProps
const Navbar: React.FC<Props> = ({ isAuth, friends, newMessagesCount }) => {
  return (
    <nav className={s.nav}>
      <ul className={s.navList}>
        <li className={s.item}>
          <NavLink to="/profile" activeClassName={s.active}>
            <FontAwesomeIcon icon={faHome} />
           <span className={s.title}>Profile</span>
          </NavLink>
        </li>
        <li className={s.item}>
          <NavLink to="/dialogs" activeClassName={s.active}>
            <FontAwesomeIcon icon={faComments} />
            <span className={s.title}>Messages</span>
            {newMessagesCount > 0 && isAuth && (
              <Counter count={newMessagesCount} />
            )}
          </NavLink>
        </li>
        <li className={s.item}>
          <NavLink to="/users" activeClassName={s.active}>
            <FontAwesomeIcon icon={faUsers} />
            <span className={s.title}>Users</span>
          </NavLink>
        </li>
        <li className={s.item}>
          <NavLink to="/News" activeClassName={s.active}>
            <FontAwesomeIcon icon={faNewspaper} />
            <span className={s.title}>News</span>
          </NavLink>
        </li>
        <li className={s.item}>
          <NavLink to="/Music" activeClassName={s.active}>
            <FontAwesomeIcon icon={faMusic} />
            <span className={s.title}>Music</span>
          </NavLink>
        </li>
        <li className={s.item}>
          <NavLink to="/Settings" activeClassName={s.active}>
            <FontAwesomeIcon icon={faCogs} />
            <span className={s.title}>Settings</span>
          </NavLink>
        </li>
      </ul>
      {isAuth && (
        <div className={s.friends}>
          <h3>Friends</h3>
          <ul className={s.friendsList}>
            {friends.map(item => (
              <FriendsElement
                key={item.id}
                name={item.name}
                avatar={item.avatar}
              />
            ))}
          </ul>
        </div>
      )}
    </nav>
  )
}

interface MapStateProps {
  isAuth: boolean
  friends: Friends[]
  newMessagesCount: number
}
let mapStateToProps = (state: AppStateType) => ({
  isAuth: state.auth.isAuth,
  friends: state.sidebar.friends,
  newMessagesCount: state.dialogsPage.newMessagesCount
})
export default connect<MapStateProps, {}, null, AppStateType>(
  mapStateToProps,
  {}
)(Navbar)
