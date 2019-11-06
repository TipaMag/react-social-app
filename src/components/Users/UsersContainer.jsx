import React from 'react'
import { connect } from 'react-redux'
import { followActionCreator, unfollowActionCreator,setUsersActionCreator, setCurrentUsersPageActionCreator } from '../../redux/users-reducer'
import * as axios from 'axios'
import Users from './Users'


class UsersContainer extends React.Component {
   componentDidMount() {
      axios.get(`https://social-network.samuraijs.com/api/1.0/users?count=${this.props.pageSize}&page=${this.props.currentPage}`)
         .then((response) => {
            this.props.setUsers(response.data)
         })
   }
   getNewPage = (pageNumber) => {
      this.props.setCurrentUsersPage(pageNumber)
      axios.get(`https://social-network.samuraijs.com/api/1.0/users?count=${this.props.pageSize}&page=${pageNumber}`)
         .then((response) => {
            this.props.setUsers(response.data)
         })
   }
   render() {
      return (
         <Users   totalUsersCount={this.props.totalUsersCount} 
                  pageSize={this.props.pageSize}
                  currentPage={this.props.currentPage}
                  users={this.props.users}
                  
                  getNewPage={this.getNewPage}
                  unfollowUser={this.props.unfollowUser}
                  followUser={this.props.followUser}/>
      )
   }
}

let mapStateToProps = (state) => {
   return {
      users: state.usersPage.users,
      pageSize: state.usersPage.pageSize,
      totalUsersCount: state.usersPage.totalUsersCount,
      currentPage: state.usersPage.currentPage
   }
}
let mapDispatchToProps = (dispatch) => {
   return {
      followUser: (userId) => {
         dispatch(followActionCreator(userId))
      },
      unfollowUser: (userId) => {
         dispatch(unfollowActionCreator(userId))
      },
      setUsers: (users) => {
         dispatch(setUsersActionCreator(users))
      },
      setCurrentUsersPage: (pageNumber) => {
         dispatch(setCurrentUsersPageActionCreator(pageNumber))
      }
   }
}
export default connect(mapStateToProps, mapDispatchToProps)(UsersContainer)