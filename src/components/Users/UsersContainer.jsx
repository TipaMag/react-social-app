import React from 'react'
import { connect } from 'react-redux'
import { setUsers, follow, unfollow, toggleFollowingProgress, setCurrentUsersPage, toggleIsFetching, getUsersThunkCreator } from '../../redux/users-reducer'
import Users from './Users'
import Preloader from '../common/Preloader/Preloader'
import { usersAPI } from '../../api/api'

class UsersContainer extends React.Component {
   componentDidMount() {
      this.props.getUsers(this.props.pageSize, this.props.currentPage)
   }
   getNewPage = (pageNumber) => {
      this.props.getUsers(this.props.pageSize, pageNumber)
      // this.props.toggleIsFetching(true)
      // this.props.setCurrentUsersPage(pageNumber)
      // usersAPI.getUsers(this.props.pageSize, pageNumber) // ----------------------------usersAPI.getUsers
      //    .then((response) => {
      //       this.props.toggleIsFetching(false)
      //       this.props.setUsers(response)
      //    })
   }
   setFollow = (userId) => {
      this.props.toggleFollowingProgress(true, userId)
      usersAPI.setFollow(userId) // ----------------------------------------------------usersAPI.setFollow
         .then((response) => {
            if (response.resultCode === 0) {
               this.props.follow(userId)
            }
            this.props.toggleFollowingProgress(false, userId)
         })
   }
   setUnfollow = (userId) => {
      this.props.toggleFollowingProgress(true, userId)
      usersAPI.setUnfollow(userId) // --------------------------------------------------usersAPI.setUnfollow
         .then((response) => {
            if (response.resultCode === 0) {
               this.props.unfollow(userId)
            }
            this.props.toggleFollowingProgress(false, userId)
         })
   }
   render() {
      return (
         <>
            {this.props.isFetching ? <Preloader /> : null}
            <Users {...this.props}
               getNewPage={this.getNewPage} 
               setFollow={this.setFollow}
               setUnfollow={this.setUnfollow} />
         </>
      )
   }
}

let mapStateToProps = (state) => ({
   users: state.usersPage.users,
   pageSize: state.usersPage.pageSize,
   totalUsersCount: state.usersPage.totalUsersCount,
   currentPage: state.usersPage.currentPage,
   isFetching: state.usersPage.isFetching,
   followingInProgress: state.usersPage.followingInProgress
})
export default connect(mapStateToProps, {
   setUsers,
   follow,
   unfollow,
   toggleFollowingProgress,
   setCurrentUsersPage,
   toggleIsFetching,
   getUsers: getUsersThunkCreator //thunk
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