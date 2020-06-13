import React from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom'
import defaultUserPhoto from '../../../assets/images/default-avatar-icon.png'
import Button from '../../../elements/Button'

// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
// import { faEnvelope } from '@fortawesome/free-solid-svg-icons'
import { UserType } from '../../../types/Users-types'

export const ListItem = styled.li`
   display: flex;
   justify-content: space-between;
   align-items: center;
   padding: 6px 0;
   border-bottom: 1px solid #e3e4e8;
`
export const UserPhoto = styled.div`
    width: 50px;
    height: 50px;
    border-radius: 50%;
    overflow: hidden;
    margin-right: 20px;
    & a {
        display: flex;
    }
    & a img {
        width: 100%;
    }
`
export const UserInfo = styled.div`
    display: flex;
    flex-flow: column;
    flex-grow: 2;
    align-items: flex-start;
`
export const UserInfoName = styled.span`

`
export const UserInfoTitle = styled.span`
    color: #afafaf;
`
export const SendMessageStyledLink = styled(Link)`
   color: var(--DARK-BLUE);
   text-decoration: none;
   font-size: 12px;
   margin-top: 5px;
   &:hover {
      text-decoration: underline;
   }
`
export const FollowingBtn = styled.div`
    margin: 0 20px;
`

type Props = {
   user: UserType
   isAuth: boolean
   onFollow: (userId: number) => void
   onUnfollow: (userId: number) => void
   onStartChatting: (userId: number) => void
   followingInProgress: Array<number>
}

const User: React.FC<Props> = ({ user, isAuth, followingInProgress, onUnfollow, onFollow, onStartChatting }) => {
   return (
      <ListItem>
         <UserPhoto>
            <Link to={'/profile/' + user.id}>
               <img src={user.photos.small != null ? user.photos.small : defaultUserPhoto} alt='avatar'></img>
            </Link>
         </UserPhoto>

         <UserInfo>
            <UserInfoName>{user.name}</UserInfoName>
            <UserInfoTitle>{user.status}</UserInfoTitle>
            {isAuth &&
               <SendMessageStyledLink to={'/dialogs/' + user.id} onClick={() => onStartChatting(user.id)}>
                  Write message
               </SendMessageStyledLink>
            }
         </UserInfo>

         {isAuth &&
            <FollowingBtn>
               {user.followed
                  ? <Button disabled={followingInProgress.some(id => id === user.id)} onClick={() => onUnfollow(user.id)}>unfollow</Button>
                  : <Button disabled={followingInProgress.some(id => id === user.id)} onClick={() => onFollow(user.id)}>follow</Button>
               }
            </FollowingBtn>
         }
      </ListItem>
   )
}
export default User