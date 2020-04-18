import React from "react"
import { NavLink, Link } from "react-router-dom"
import styled from 'styled-components'
import defaultUserImage from "../../../assets/images/default-user-image.png"
import Counter from "../../common/Counter/Counter"
import { DialogType } from "../../../types/Dialogs-types"

const DialogItem = styled.li`
  font-size: 14px;
  border-radius: 5px;
  overflow: hidden;
  margin-bottom: 5px;
  position: relative;
  &:hover {
    background-color: var(--WHITE)
  }
`
const PhotoLink = styled(Link)`
  width: 38px;
  height: 38px;
  display: block;
  position: absolute;
  top: 50%;
  left: 5px;
  transform: translateY(-50%);
  z-index: 1;
  border-radius: 50%;
  overflow: hidden;
  transition: all 0.3s;
  & img {
    width: 100%;
    height: 100%;
  }
  &:hover::after {
    content: '';
    width: 100%;
    height: 100%;
    background-color: rgba(0,0,0,0.3);
    position: absolute;
    top: 0;
    left: 0;
  }
`
const BodyNavLink = styled(NavLink)`
  display: flex;
  align-items: center;
  text-decoration: none;
  position: relative;
  height: 50px;
  padding-left: 60px;
  color: black;
  &.active {
    background-color: var(--DARK-BLUE);
    color: #fff;
  }
`
const UserName = styled.span`

`
const Meta = styled.div`
  position: absolute;
  right: 10px;
`
interface Props {
  dialog: DialogType,
  getMessages: (userId: number) => void
}
const Dialog: React.FC<Props> = ({
  dialog: { id, userName, hasNewMessages, newMessagesCount, photos },
  getMessages
}) => {
  const onMessagesHandler = () => {
    getMessages(id)
  }
  return (
    <DialogItem>
      <PhotoLink to={"/profile/" + id}>
        <img src={photos.small || defaultUserImage} alt="avatar"></img>
      </PhotoLink>
      <BodyNavLink to={"/dialogs/" + id} onClick={onMessagesHandler}>
        <UserName>
          {userName}
        </UserName>
        <Meta>
          {hasNewMessages
            && <Counter count={newMessagesCount} />
          }
        </Meta>
      </BodyNavLink>
    </DialogItem>
  )
}

export default Dialog
