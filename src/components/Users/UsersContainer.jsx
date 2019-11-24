import React from 'react'
import { connect } from 'react-redux'
import { getUsers, getNewPage, setFollow, setUnfollow } from '../../redux/users-reducer'
import Users from './Users'
import Preloader from '../common/Preloader/Preloader'
import { compose } from '../../../../../../AppData/Local/Microsoft/TypeScript/3.6/node_modules/redux'

class UsersContainer extends React.Component {
   componentDidMount() {
      this.props.getUsers(this.props.pageSize, this.props.currentPage)
   }
   onPageChanged = (pageNumber) => {
      this.props.getNewPage(this.props.pageSize, pageNumber)
   }
   onFollow = (userId) => {
      this.props.setFollow(userId)
   }
   onUnfollow = (userId) => {
      this.props.setUnfollow(userId)
   }
   render() {
      return (
         <>
            {this.props.isFetching ? <Preloader /> : null}
            <Users {...this.props}
               onPageChanged={this.onPageChanged} 
               onFollow={this.onFollow}
               onUnfollow={this.onUnfollow} />
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
export default compose( // connect (такой себе рекурсивный декоратор)
   connect(mapStateToProps, {
      getUsers, //thunk
      getNewPage, //thunk
      setFollow, //thunk
      setUnfollow //thunk
   })
)(UsersContainer)





// export default connect(mapStateToProps, {
//    getUsers, //thunk
//    getNewPage, //thunk
//    setFollow, //thunk
//    setUnfollow //thunk
// })(UsersContainer)

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