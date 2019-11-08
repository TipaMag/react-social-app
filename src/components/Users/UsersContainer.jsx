import React from 'react'
import { connect } from 'react-redux'
import { follow, unfollow, setUsers, setCurrentUsersPage, toggleIsFetching } from '../../redux/users-reducer'
import * as axios from 'axios'
import Users from './Users'
import Preloader from '../common/Preloader/Preloader'
class UsersContainer extends React.Component {
   componentDidMount() {
      this.props.toggleIsFetching(true)
      axios.get(`https://social-network.samuraijs.com/api/1.0/users?count=${this.props.pageSize}&page=${this.props.currentPage}`)
         .then((response) => {
            this.props.toggleIsFetching(false)
            this.props.setUsers(response.data)
         })
   }
   getNewPage = (pageNumber) => {
      this.props.toggleIsFetching(true)
      this.props.setCurrentUsersPage(pageNumber)
      axios.get(`https://social-network.samuraijs.com/api/1.0/users?count=${this.props.pageSize}&page=${pageNumber}`)
         .then((response) => {
            this.props.toggleIsFetching(false)
            this.props.setUsers(response.data)
         })
   }
   render() {
      return (
         <>
            {this.props.isFetching ? <Preloader /> : null}
            <Users {...this.props} getNewPage={this.getNewPage} />
         </>
      )
   }
}

let mapStateToProps = (state) => ({
   users: state.usersPage.users,
   pageSize: state.usersPage.pageSize,
   totalUsersCount: state.usersPage.totalUsersCount,
   currentPage: state.usersPage.currentPage,
   isFetching: state.usersPage.isFetching
})
export default connect(mapStateToProps, {
   follow,
   unfollow,
   setUsers,
   setCurrentUsersPage,
   toggleIsFetching
})(UsersContainer)


// let mapDispatchToProps = (dispatch) => {
//    return {
//       followUser: (userId) => {
//          dispatch(followAC(userId))
//       },
//       unfollowUser: (userId) => {
//          dispatch(unfollowAC(userId))
//       },
//       setUsers: (users) => {
//          dispatch(setUsersAC(users))
//       },
//       setCurrentUsersPage: (pageNumber) => {
//          dispatch(setCurrentUsersPageAC(pageNumber))
//       },
//       toggleIsFetching: (isFetching) => {
//          dispatch(setIsFetchingAC(isFetching))
//       }
//    }
// }