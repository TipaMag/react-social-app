import { usersAPI, ResultCodesEnum } from "../api/api"
import { updateObjectInArray } from "../components/utils/object-helpers"
import { UsersInitial, UsersType } from "../types/Users-types"
import { SET_USERS, FOLLOW_SUCCESS, UNFOLLOW_SUCCESS, FOLLOWING_IN_PROGRESS, SET_CURRENT_USERS_PAGE, TOGGLE_IS_FETCHING, SET_SEARCH_USER, 
   AppActionTypes, UsersActionTypes } from "../types/actions"
import { ThunkAction } from "redux-thunk"
import { AppStateType } from "./redux-store"
import { Dispatch } from "redux"


let initialState: UsersInitial = {
   users: {
      items: [],
      totalCount: 0,
      error: ''
   },
   pageSize: 10,
   totalUsersCount: 0, // убрать потом... totalCount теперь есть у users
   currentPage: 1, // start page
   isFetching: false, // preloader
   followingInProgress: [],// array of users id`s
   searchUser: ''
}

const usersReducer = (state = initialState, action: UsersActionTypes): UsersInitial => {
   switch (action.type) {
      case SET_USERS:
         return {
            ...state,
            users: action.users,
            totalUsersCount: action.users.totalCount,
         }
      case FOLLOW_SUCCESS:
         return {
            ...state,
            users: {
               ...state.users,
               items: updateObjectInArray(state.users.items, 'id', action.userId, { followed: true })
            }
         }
      case UNFOLLOW_SUCCESS:
         return {
            ...state,
            users: {
               ...state.users,
               items: updateObjectInArray(state.users.items, 'id', action.userId, { followed: false })
            }
         }
      case FOLLOWING_IN_PROGRESS:
         return {
            ...state,
            followingInProgress: action.isFetching
               ? [...state.followingInProgress, action.userId]
               : [state.followingInProgress.filter((id: number) => id !== action.userId)]
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
      case SET_SEARCH_USER:
         return {
            ...state,
            searchUser: action.searchUser,
         }
      default:
         return state
   }
}


export const setUsers = (users: UsersType): AppActionTypes => ({ 
   type: SET_USERS,
   users 
})
export const followSuccess = (userId: number): AppActionTypes => ({ 
   type: FOLLOW_SUCCESS,
   userId 
})
export const unfollowSuccess = (userId: number): AppActionTypes => ({ 
   type: UNFOLLOW_SUCCESS,
   userId 
})
export const toggleFollowingProgress = (isFetching: boolean, userId: number): AppActionTypes => ({ 
   type: FOLLOWING_IN_PROGRESS, 
   isFetching, 
   userId 
})
export const setCurrentUsersPage = (pageNumber: number): AppActionTypes => ({ 
   type: SET_CURRENT_USERS_PAGE,
   pageNumber 
})
export const toggleIsFetching = (isFetching: boolean): AppActionTypes => ({ 
   type: TOGGLE_IS_FETCHING,
   isFetching 
})
export const setSearchUser = (searchUser: string): AppActionTypes => ({ 
   type: SET_SEARCH_USER,
   searchUser 
})


type GetStateType = () => AppStateType
type DispatchType = Dispatch<AppActionTypes>
type ThunkType = ThunkAction<void, AppStateType, unknown, AppActionTypes>
export const requestUsers = (pageSize: number, page: number): ThunkType => async (dispatch, getState: GetStateType) => {
   dispatch(toggleIsFetching(true))
   let response = await usersAPI.getUsers(pageSize, page, getState().usersPage.searchUser)
   dispatch(toggleIsFetching(false))
   dispatch(setUsers(response.data))
}

const _followUnfollowFlow = async (dispatch: DispatchType, userId: number, apiMethod: any, actionCreator: (userId: number) => AppActionTypes) => {
   dispatch(toggleFollowingProgress(true, userId))
   let response = await apiMethod(userId)
   if (response.resultCode === ResultCodesEnum.Success) {
      dispatch(actionCreator(userId))
   }
   dispatch(toggleFollowingProgress(false, userId))
}
export const setFollow = (userId: number): ThunkType => async (dispatch) => {
   _followUnfollowFlow(dispatch, userId, usersAPI.setFollow.bind(usersAPI), followSuccess)
}
export const setUnfollow = (userId: number): ThunkType => async (dispatch) => {
   _followUnfollowFlow(dispatch, userId, usersAPI.setUnfollow.bind(usersAPI), unfollowSuccess)
}

export const getNewPage = (pageSize: number, page: number): ThunkType => async (dispatch, getState: GetStateType) => {
   dispatch(toggleIsFetching(true))
   dispatch(setCurrentUsersPage(page))
   let response = await usersAPI.getUsers(pageSize, page, getState().usersPage.searchUser)
   dispatch(toggleIsFetching(false))
   dispatch(setUsers(response.data))
}
export const searchUsers = (searchUser: string): ThunkType => async (dispatch, getState: GetStateType) => {
   if (searchUser !== getState().usersPage.searchUser) {
      dispatch(setSearchUser(searchUser))
      dispatch(setCurrentUsersPage(1))
   }
}

export default usersReducer