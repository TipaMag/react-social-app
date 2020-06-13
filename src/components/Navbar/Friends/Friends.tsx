import React from 'react';
import styled from 'styled-components'
import defaultPhoto from './../../../assets/images/default-user-image.png'

import { Link } from 'react-router-dom';
import { GetItemsType } from '../../../api/api';
import { UserType } from '../../../types/Users-types';

const FriendsContainer = styled.div`
  padding: 10px;
  background-color: var(--WHITE);
  border-radius: 5px;
  box-shadow: 0 1px 0 0 #d7d8db, 0 0 0 1px #e3e4e8;
`
const Title = styled.span`
  margin-bottom: 10px;
  display: flex;
  & span {
    color: var(--DARK-GRAY);
    margin-left: 8px;
  }
`
const FriendsList = styled.ul`
  display: grid;
  grid-template-columns: repeat(3, 52px);
  grid-gap: 5px;
  list-style: none;
  padding: 0;
  margin: 0;
`
const FriendItem = styled.li`
  text-align: center;
  cursor: pointer;
  transition: 0.3s;
  &:hover {
    transform: translateY(-3px);
  }
`
const StyledLink = styled(Link)`
  display: flex;
  flex-flow: column;
  align-items: center;
  text-decoration: none;
  font-size: 18px;
  color: #000;
`
const FriendPhoto = styled.img`
  border-radius: 50%;
  width: 40px;
  height: 40px;
`
const FriendName = styled.span`
  font-size: 12px;
  overflow: hidden;
  text-overflow: ellipsis;
  width: 100%;
  &:hover {
    text-decoration: underline;
  }
`

type Props = {
  friends: GetItemsType<UserType>
}

const Friends: React.FC<Props> = ({ friends }) => {
  return (
    <FriendsContainer>
      <Title>Friends <span>{friends && friends.totalCount}</span></Title>
      <FriendsList>
        {friends.items && 
          friends.items.map(item => (
            <FriendItem key={item.id}>
              <StyledLink to={'/profile/' + item.id}>
                <FriendPhoto src={item.photos.small !== null ? item.photos.small : defaultPhoto} alt='avatar'></FriendPhoto>
                <FriendName>{item.name}</FriendName>
              </StyledLink>
            </FriendItem>
          ))}
      </FriendsList>
    </FriendsContainer>

  )
}

export default Friends;