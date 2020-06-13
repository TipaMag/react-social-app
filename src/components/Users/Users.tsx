import React, { useEffect, useState } from 'react'
import { compose } from 'redux'
import { connect } from 'react-redux'
import styled from 'styled-components'

import Paggination from '../common/Paggination/Paggination'
import User from './User/User'

import { getUsers, getAuth, getUsersPageSize, getCurrentPage, getIsFetching, getFollowingInProgress, getSearchUser, getFriends } from '../../redux/users-selectors'
import { AppStateType } from '../../redux/redux-store'
import { UserType } from '../../types/Users-types'
import { requestUsers, setFollow, setUnfollow, searchUsers } from '../../redux/users-reducer'
import { startChatting } from '../../redux/dialogs-reducer'
import Preloader from '../common/Preloader/Preloader'
import Search from './Search/Search'
import { GetItemsType } from '../../api/api'
import Counter from '../common/Counter/Counter'

const UsersContainer = styled.div`

`
const Tabs = styled.div`
   display: flex;
`
const TabsList = styled.div`
   display: flex;
   flex-flow: row wrap;
   align-self: flex-start;
   order: 2;
   position: relative;
   padding: 7px 0;
   background-color: var(--WHITE);
   border-radius: 5px;
   box-shadow: 0 1px 0 0 #d7d8db, 0 0 0 1px #e3e4e8;
`
const Tab = styled.div<{active: boolean, id: any}>`
   display: flex;
   justify-content: space-around;
   padding: 10px 5px;
   width: 100%;
   cursor: pointer;
   background-color: ${p => p.active ? "var(--LIGHT-BLUE)" : "transparent"};
   border-left: ${p => p.active ? "2px solid black" : ""};
   &:hover {
      background-color: var(--LIGHT-BLUE);
   }
`
const TabsBody = styled.div`
   flex: 1 1;
   margin-right: 10px;
   padding: 5px 10px 0px;
   background-color: var(--WHITE);
   border-radius: 5px;
   box-shadow: 0 1px 0 0 #d7d8db, 0 0 0 1px #e3e4e8;
`
const TabContent = styled.div<{active: boolean}>`
   display: ${p => p.active ? 'flex' : 'none'};
   flex-direction: column;
`
const Controls = styled.div`
   display: flex;
   flex-direction: column;
   margin-bottom: 10px;
`
const UsersList = styled.ul`
   display: grid;
   width: 100%;
   margin: 0;
   padding: 0;
   list-style: none;
`
// const NoUsers = styled.div`
//    display: flex;
//    justify-content: center;
//    align-items: center;
//    height: 100%;
//    box-shadow: 3px 3px 5px rgba(0,0,0,0.2),
//                -3px -3px 5px rgba(255,255,255,0.5);
//    & span {
//       font-size: 30px;
//       color: var(--DARK-GRAY);
//    }
// `

type Props = MapStateProps & MapDispatchProps
const Users: React.FC<Props> = ({ users, friends, isAuth, isFetching, followingInProgress, pageSize, currentPage, ...props }) => {
   
   const [active, setActive] = useState(0)

   const handleClick = (e: any) => {
      if (e.target.id) {
         const index = parseInt(e.target.id, 0)
         if (index !== active) {
            setActive(index)
         }
      }
   }

   useEffect(() => {
      props.requestUsers(false, pageSize, currentPage.all)
      props.requestUsers(true, pageSize, currentPage.Friends)
      // eslint-disable-next-line react-hooks/exhaustive-deps
   }, [])

   const onPageChanged = (friend: boolean, page: number) => {
      props.requestUsers(friend, pageSize, page)
   }
   const onFollow = (userId: number) => {
      props.setFollow(userId)
   }
   const onUnfollow = (userId: number) => {
      props.setUnfollow(userId)
   }
   const onSearchUser = (friend: boolean, searchUser: string) => {
      props.searchUsers(friend, searchUser)
   }
   const onStartChatting = (userId: number) => {
      props.startChatting(userId)
   }

   // if (isFetching) return <Preloader />
   return (
      <UsersContainer>
         <Tabs>

            <TabsList onClick={e => handleClick(e)}>
               <Tab active={active === 0} id={0} >
                  All users
                  <Counter count={users.totalCount}/>
               </Tab>
               <Tab active={active === 1} id={1} >
                  Friends
                  <Counter count={friends.totalCount}/>
               </Tab>
            </TabsList>

            <TabsBody>

               <TabContent active={active === 0}>
                  <Controls>
                     {users.totalCount > 0 &&
                        <Paggination totalItemsCount={users.totalCount}
                           pageSize={pageSize}
                           currentPage={currentPage.all}
                           friend={false}
                           onPageChanged={onPageChanged}
                        />
                     }
                     <Search friend={false} onSearchUser={onSearchUser} />
                  </Controls>
                  
                  { isFetching ? <Preloader/>
                     : users.totalCount > 0 &&
                     <UsersList>
                        {users.items.map(user =>
                           <User key={user.id}
                              user={user}
                              isAuth={isAuth}
                              onFollow={onFollow}
                              onUnfollow={onUnfollow}
                              onStartChatting={onStartChatting}
                              followingInProgress={followingInProgress}
                           />)
                        }
                     </UsersList>
                  }
               </TabContent>

               <TabContent active={active === 1}>
                  <Controls>
                     {friends.totalCount > 0 &&
                        <Paggination totalItemsCount={friends.totalCount}
                           pageSize={pageSize}
                           currentPage={currentPage.friends}
                           friend={true}
                           onPageChanged={onPageChanged}
                        />
                     }
                     <Search friend={true} onSearchUser={onSearchUser} />
                  </Controls>

                  { isFetching ? <Preloader/>
                     : friends.totalCount > 0 &&
                     <UsersList>
                        {friends.items.map(user =>
                           <User key={user.id}
                              user={user}
                              isAuth={isAuth}
                              onFollow={onFollow}
                              onUnfollow={onUnfollow}
                              onStartChatting={onStartChatting}
                              followingInProgress={followingInProgress}
                           />)
                        }
                     </UsersList>
                  }

               </TabContent>
            </TabsBody>
         </Tabs>

      </UsersContainer>
   )
}

interface MapStateProps {
   users: GetItemsType<UserType>
   friends: GetItemsType<UserType>
   isAuth: boolean
   pageSize: number
   currentPage: any
   isFetching: boolean
   followingInProgress: Array<number>
   searchUser: string
}
interface MapDispatchProps {
   requestUsers: (friends: boolean, pageSize: number, page: number) => void
   setFollow: (userId: number) => void
   setUnfollow: (userId: number) => void
   searchUsers: (friend: boolean, searchUser: string) => void

   startChatting: (userId: number) => void
}
let mapStateToProps = (state: AppStateType) => ({
   users: getUsers(state),
   friends: getFriends(state),
   isAuth: getAuth(state),
   pageSize: getUsersPageSize(state),
   currentPage: getCurrentPage(state),
   isFetching: getIsFetching(state),
   followingInProgress: getFollowingInProgress(state),
   searchUser: getSearchUser(state)
})

export default compose(
   connect<MapStateProps, MapDispatchProps, {}, AppStateType>(mapStateToProps, {
      requestUsers,
      setFollow,
      setUnfollow,
      searchUsers,

      startChatting
   })
)(Users)