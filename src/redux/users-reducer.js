import { usersAPI } from "../api/api"

const FOLLOW = 'FOLLOW'
const UNFOLLOW = 'UNFOLLOW'
const SET_USERS = 'SET-USERS'
const SET_CURRENT_USERS_PAGE = 'SET-CURRENT-USERS-PAGE'
const TOGGLE_IS_FETCHING = 'TOGGLE-IS-FETCHING'
const FOLLOWING_IN_PROGRESS = 'FOLLOWING-IN-PROGRESS'

let initialState = {
   users: [],
   pageSize: 5,
   totalUsersCount: 0,
   currentPage: 1,
   isFetching: false, // preloader
   followingInProgress: []
}

const usersReducer = (state = initialState, action) => {
   switch (action.type) {
      // case "FAKE": 
      //    return {
      //       ...state,
      //       fake: state.fake + 1
      //    }
      case SET_USERS:
         return {
            ...state,
            users: action.users.items,
            totalUsersCount: action.users.totalCount,
         }
      case FOLLOW:
         return {
            ...state,
            users: state.users.map(user => {
               if (user.id === action.userId) {
                  return { ...user, followed: true }
               }
               return user
            })
         }
      case UNFOLLOW:
         return {
            ...state,
            users: state.users.map(user => {
               if (user.id === action.userId) {
                  return { ...user, followed: false }
               }
               return user
            })
         }
      case FOLLOWING_IN_PROGRESS:
         return {
            ...state,
            followingInProgress: action.isFetching
               ? [...state.followingInProgress, action.userId]
               : [state.followingInProgress.filter(id => id !== action.userId)]
         }
      case SET_CURRENT_USERS_PAGE:
         return {
            ...state,
            currentPage: action.pageNumber
         }
      case TOGGLE_IS_FETCHING:
         return {
            ...state,
            isFetching: action.isFetching
         }
      default:
         return state
   }
}

export const setUsers = (users) => ({
   type: SET_USERS,
   users
})
export const follow = (userId) => ({
   type: FOLLOW,
   userId
})
export const unfollow = (userId) => ({
   type: UNFOLLOW,
   userId
})
export const toggleFollowingProgress = (isFetching, userId) => ({
   type: FOLLOWING_IN_PROGRESS,
   isFetching,
   userId
})
export const setCurrentUsersPage = (pageNumber) => ({
   type: SET_CURRENT_USERS_PAGE,
   pageNumber
})
export const toggleIsFetching = (isFetching) => ({
   type: TOGGLE_IS_FETCHING,
   isFetching
})
// ---------------------- THUNK creators ---------------------
export const requestUsers = (pageSize, page) => {
   return (dispatch) => {
      dispatch(toggleIsFetching(true))
      usersAPI.getUsers(pageSize, page) // ----------------usersAPI.getUsers
         .then((response) => {
            dispatch(toggleIsFetching(false))
            dispatch(setUsers(response.data))
         })
   }
}
export const getNewPage = (pageSize, page) => {
   return (dispatch) => {
      dispatch(toggleIsFetching(true))
      dispatch(setCurrentUsersPage(page))
      usersAPI.getUsers(pageSize, page) // ----------------usersAPI.getUsers
         .then((response) => {
            dispatch(toggleIsFetching(false))
            dispatch(setUsers(response.data))
         })
   }
}
export const setFollow = (userId) => {
   return (dispatch) => {
      dispatch(toggleFollowingProgress(true, userId))
      usersAPI.setFollow(userId) // ----------------------------------------------------usersAPI.setFollow
         .then((response) => {
            if (response.data.resultCode === 0) {
               dispatch(follow(userId))
            }
            dispatch(toggleFollowingProgress(false, userId))
         })
   }
}
export const setUnfollow = (userId) => {
   return (dispatch) => {
      dispatch(toggleFollowingProgress(true, userId))
      usersAPI.setUnfollow(userId) // ----------------------------------------------------usersAPI.setFollow
         .then((response) => {
            if (response.data.resultCode === 0) {
               dispatch(unfollow(userId))
            }
            dispatch(toggleFollowingProgress(false, userId))
         })
   }
}

export default usersReducer