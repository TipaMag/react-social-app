import React from 'react'
import { connect } from 'react-redux'
import { requestUsers, getNewPage, setFollow, setUnfollow } from '../../redux/users-reducer'
import Users from './Users'
import Preloader from '../common/Preloader/Preloader'
import { compose } from '../../../../../../AppData/Local/Microsoft/TypeScript/3.6/node_modules/redux'
import { getUsers, getUsersPageSize, getTotalUsersCount, getCurrentPage, getIsFetching, getFollowingInProgress } from '../../redux/users-selectors'

class UsersContainer extends React.Component {
   componentDidMount() {
      this.props.requestUsers(this.props.pageSize, this.props.currentPage)
   }
   onPageChanged = (page) => {
      this.props.getNewPage(this.props.pageSize, page)
   }
   onFollow = (userId) => {
      this.props.setFollow(userId)
   }
   onUnfollow = (userId) => {
      this.props.setUnfollow(userId)
   }
   render() {
      // console.log('render USERS')
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

let mapStateToProps = (state) => {
   // console.log('mapStateToProps USERS')
   return ({
      users: getUsers(state),
      pageSize: getUsersPageSize(state),
      totalUsersCount: getTotalUsersCount(state),
      currentPage: getCurrentPage(state),
      isFetching: getIsFetching(state),
      followingInProgress: getFollowingInProgress(state)
   })
}
export default compose( // connect (такой себе рекурсивный декоратор)
   connect(mapStateToProps, {
      requestUsers, //thunk
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