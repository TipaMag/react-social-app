import React from 'react'
import { Link } from 'react-router-dom'
import defaultUserPhoto from '../../../assets/images/default-avatar-icon.png'
import Button from '../../../elements/Button'
import { ListItem, UserPhoto, UserInfo, UserInfoName, UserInfoTitle, SendMessageBtn, FollowingBtn } from './User.styles'

interface Props {
   userId: number
   smallPhoto: string
   name: string
   status: string
   followed: boolean
   isAuth: boolean
   onFollow: (userId: number) => void
   onUnfollow: (userId: number) => void
   startChatting: (userId: number) => void
   followingInProgress: Array<number>
}

const User: React.FC<Props> = ({ userId, smallPhoto, name, status, followed, isAuth, onUnfollow, onFollow, startChatting, followingInProgress }) => {
   return (
      <ListItem>
         <UserPhoto>
            <Link to={'/profile/' + userId}>
               <img src={smallPhoto != null ? smallPhoto : defaultUserPhoto} alt='avatar'></img>
            </Link>
         </UserPhoto>
         <UserInfo>
            <UserInfoName>{name}</UserInfoName>
            <UserInfoTitle>{status}</UserInfoTitle>
         </UserInfo>
         {isAuth &&
            <>
               <SendMessageBtn>
                  <Link to={'/dialogs/' + userId} onClick={() => startChatting(userId)}>
                     <Button type="button">write a message</Button>
                  </Link>
               </SendMessageBtn>
               <FollowingBtn>
                  {followed
                     ? <Button disabled={followingInProgress.some(id => id === userId)} onClick={() => onUnfollow(userId)}>unfollow</Button>
                     : <Button disabled={followingInProgress.some(id => id === userId)} onClick={() => onFollow(userId)}>follow</Button>
                  }
               </FollowingBtn>
            </>
         }
      </ListItem>
   )
}
export default User