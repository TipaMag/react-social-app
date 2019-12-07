import {
   usersAPI
} from "../api/api"
import { updateObjectInArray } from "../components/utils/object-helpers"

const FOLLOW_SUCCESS = 'FOLLOW'
const UNFOLLOW_SUCCESS = 'UNFOLLOW'
const SET_USERS = 'SET-USERS'
const SET_CURRENT_USERS_PAGE = 'SET-CURRENT-USERS-PAGE'
const TOGGLE_IS_FETCHING = 'TOGGLE-IS-FETCHING'
const FOLLOWING_IN_PROGRESS = 'FOLLOWING-IN-PROGRESS'

let initialState = {
   users: [],
   pageSize: 5,
   totalUsersCount: 0,
   currentPage: 1, // start page
   isFetching: false, // preloader
   followingInProgress: []
}

const usersReducer = (state = initialState, action) => {
   switch (action.type) {
      case SET_USERS:
         return {
            ...state,
            users: action.users.items,
               totalUsersCount: action.users.totalCount,
         }
      case FOLLOW_SUCCESS:
         return {
            ...state,
            users: updateObjectInArray(state.users, 'id', action.userId, {followed: true}) // стало...
         }
      case UNFOLLOW_SUCCESS:
         return {
            ...state,
            users: updateObjectInArray(state.users, 'id', action.userId, {followed: false})
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
export const followSuccess = (userId) => ({
   type: FOLLOW_SUCCESS,
   userId
})
export const unfollowSuccess = (userId) => ({
   type: UNFOLLOW_SUCCESS,
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
export const requestUsers = (pageSize, page) => async (dispatch) => {
   dispatch(toggleIsFetching(true))
   let response = await usersAPI.getUsers(pageSize, page) // ----------------usersAPI.getUsers
   dispatch(toggleIsFetching(false))
   dispatch(setUsers(response.data))
}
export const getNewPage = (pageSize, page) => async (dispatch) => {
   dispatch(toggleIsFetching(true))
   dispatch(setCurrentUsersPage(page))
   let response = await usersAPI.getUsers(pageSize, page) // ----------------usersAPI.getUsers (change page)
   dispatch(toggleIsFetching(false))
   dispatch(setUsers(response.data))
}


const followUnfollowFlow = async (dispatch, userId, apiMethod, actionCreator) => {
   dispatch(toggleFollowingProgress(true, userId))
   let response = await apiMethod(userId) // -------------usersAPI.setFollow/setUnfollow
   if (response.data.resultCode === 0) {
      dispatch(actionCreator(userId))
   }
   dispatch(toggleFollowingProgress(false, userId))
}
export const setFollow = (userId) => async (dispatch) => {
   followUnfollowFlow(dispatch, userId, usersAPI.setFollow.bind(usersAPI), followSuccess)
}
export const setUnfollow = (userId) => async (dispatch) => {
   followUnfollowFlow(dispatch, userId, usersAPI.setUnfollow.bind(usersAPI), unfollowSuccess)
}

export default usersReducer


// export const setFollow = (userId) => async (dispatch) => {
//    dispatch(toggleFollowingProgress(true, userId))
//    let response = await usersAPI.setFollow(userId) // -----------------------usersAPI.setFollow
//    if (response.data.resultCode === 0) {
//       dispatch(follow(userId))
//    }
//    dispatch(toggleFollowingProgress(false, userId))
// }
// export const setUnfollow = (userId) => async (dispatch) => {
//    dispatch(toggleFollowingProgress(true, userId))
//    let response = await usersAPI.setUnfollow(userId) // --------------------usersAPI.setUnfollow
//    if (response.data.resultCode === 0) {
//       dispatch(unfollow(userId))
//    }
//    dispatch(toggleFollowingProgress(false, userId))
// }