import React from "react"
import s from "./Dialog.module.css"
import defaultUserImage from "../../../assets/images/default-user-image.png"
import { NavLink, Link } from "react-router-dom"
import Counter from "../../common/Counter/Counter"

interface Props {
  userId: number
  avatar: string
  name: string
  hasNewMessages: boolean
  newMessagesCount: number
  getMessages: (userId: number) => void
}

const Dialog: React.FC<Props> = ({
  userId,
  avatar,
  name,
  hasNewMessages,
  newMessagesCount,
  getMessages
}) => {
  const onMessagesHandler = () => {
    getMessages(userId)
  }
  return (
    <li className={s.dialogItem}>
      <Link className={s.dialogPhoto} to={"/profile/" + userId}>
        <img src={avatar || defaultUserImage} alt="avatar"></img>
      </Link>
      <NavLink
        className={s.dialogBody}
        activeClassName={s.active}
        to={"/dialogs/" + userId}
        onClick={onMessagesHandler}
      >
        <span className={s.userName}>{name}</span>
        <div className={s.dialogMeta}>
          {hasNewMessages && (
            <Counter count={newMessagesCount}/>
          )}
        </div>
      </NavLink>
    </li>
  )
}

export default Dialog
