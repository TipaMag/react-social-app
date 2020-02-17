import { usersAPI } from "../api/api"
import { updateObjectInArray } from "../components/utils/object-helpers"
import { UserType } from "../types/types"

const FOLLOW_SUCCESS = 'FOLLOW'
const UNFOLLOW_SUCCESS = 'UNFOLLOW'
const SET_USERS = 'SET-USERS'
const SET_CURRENT_USERS_PAGE = 'SET-CURRENT-USERS-PAGE'
const TOGGLE_IS_FETCHING = 'TOGGLE-IS-FETCHING'
const FOLLOWING_IN_PROGRESS = 'FOLLOWING-IN-PROGRESS'


let initialState = {
   users: [] as Array<UserType>,
   pageSize: 10,
   totalUsersCount: 0,
   currentPage: 1, // start page
   isFetching: false, // preloader
   followingInProgress: [] as Array<number> // array of users ids
}
type InitialStateType = typeof initialState

const usersReducer = (state = initialState, action: any): InitialStateType => {
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
            users: updateObjectInArray(state.users, 'id', action.userId, { followed: true })
         }
      case UNFOLLOW_SUCCESS:
         return {
            ...state,
            users: updateObjectInArray(state.users, 'id', action.userId, { followed: false })
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

type SetUsersActionType = { type: typeof SET_USERS, users: Array<UserType> }
export const setUsers = (users: Array<UserType>): SetUsersActionType => ({ 
   type: SET_USERS, users 
})
type FollowSuccessActionType = { type: typeof FOLLOW_SUCCESS, userId: number }
export const followSuccess = (userId: number): FollowSuccessActionType => ({ 
   type: FOLLOW_SUCCESS, userId 
})
type UnfollowSuccessActionType = { type: typeof UNFOLLOW_SUCCESS, userId: number }
export const unfollowSuccess = (userId: number): UnfollowSuccessActionType => ({ 
   type: UNFOLLOW_SUCCESS, userId 
})
type ToggleFollowingProgressActionType = { type: typeof FOLLOWING_IN_PROGRESS, isFetching: boolean, userId: number }
export const toggleFollowingProgress = (isFetching: boolean, userId: number): ToggleFollowingProgressActionType => ({ 
   type: FOLLOWING_IN_PROGRESS, isFetching, userId 
})
type SetCurrentUsersPageActionType = { type: typeof SET_CURRENT_USERS_PAGE, pageNumber: number }
export const setCurrentUsersPage = (pageNumber: number): SetCurrentUsersPageActionType => ({ 
   type: SET_CURRENT_USERS_PAGE, pageNumber 
})
type ToggleIsFetchingActionType = { type: typeof TOGGLE_IS_FETCHING, isFetching: boolean }
export const toggleIsFetching = (isFetching: boolean): ToggleIsFetchingActionType => ({ 
   type: TOGGLE_IS_FETCHING, isFetching 
})

export const requestUsers = (pageSize: number, page: number) => async (dispatch: any) => {
   dispatch(toggleIsFetching(true))
   let response = await usersAPI.getUsers(pageSize, page)
   dispatch(toggleIsFetching(false))
   dispatch(setUsers(response.data))
}
export const getNewPage = (pageSize: any, page: any) => async (dispatch: any) => {
   dispatch(toggleIsFetching(true))
   dispatch(setCurrentUsersPage(page))
   let response = await usersAPI.getUsers(pageSize, page)
   dispatch(toggleIsFetching(false))
   dispatch(setUsers(response.data))
}

const followUnfollowFlow = async (dispatch: any, userId: number, apiMethod: any, actionCreator: any) => {
   dispatch(toggleFollowingProgress(true, userId))
   let response = await apiMethod(userId)
   if (response.data.resultCode === 0) {
      dispatch(actionCreator(userId))
   }
   dispatch(toggleFollowingProgress(false, userId))
}
export const setFollow = (userId: number) => async (dispatch: any) => {
   followUnfollowFlow(dispatch, userId, usersAPI.setFollow.bind(usersAPI), followSuccess)
}
export const setUnfollow = (userId: number) => async (dispatch: any) => {
   followUnfollowFlow(dispatch, userId, usersAPI.setUnfollow.bind(usersAPI), unfollowSuccess)
}

export default usersReducer