import { usersAPI, ResultCodesEnum } from "../api/api"
import { updateObjectInArray } from "../components/utils/object-helpers"
import { UsersInitial, UsersType } from "../types/Users-types"
import { ThunkAction } from "redux-thunk"
import { AppStateType, InferActionsTypes } from "./redux-store"
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

const usersReducer = (state = initialState, action: ActionsTypes): UsersInitial => {
   switch (action.type) {
      case 'SET_USERS':
         return {
            ...state,
            users: action.users,
            totalUsersCount: action.users.totalCount,
         }
      case 'FOLLOW_SUCCESS':
         return {
            ...state,
            users: {
               ...state.users,
               items: updateObjectInArray(state.users.items, 'id', action.userId, { followed: true })
            }
         }
      case 'UNFOLLOW_SUCCESS':
         return {
            ...state,
            users: {
               ...state.users,
               items: updateObjectInArray(state.users.items, 'id', action.userId, { followed: false })
            }
         }
      case 'FOLLOWING_IN_PROGRESS':
         return {
            ...state,
            followingInProgress: action.isFetching
               ? [...state.followingInProgress, action.userId]
               : [state.followingInProgress.filter((id: number) => id !== action.userId)]
         }
      case 'SET_CURRENT_USERS_PAGE':
         return {
            ...state,
            currentPage: action.pageNumber
         }
      case 'TOGGLE_IS_FETCHING':
         return {
            ...state,
            isFetching: action.isFetching
         }
      case 'SET_SEARCH_USER':
         return {
            ...state,
            searchUser: action.searchUser,
         }
      default:
         return state
   }
}

type ActionsTypes = InferActionsTypes<typeof usersActions>

export const usersActions = {
   setUsers: (users: UsersType) => ({ 
      type: 'SET_USERS',
      users 
   } as const),
   followSuccess: (userId: number) => ({ 
      type: 'FOLLOW_SUCCESS',
      userId 
   } as const),
   unfollowSuccess: (userId: number) => ({ 
      type: 'UNFOLLOW_SUCCESS',
      userId 
   } as const),
   toggleFollowingProgress: (isFetching: boolean, userId: number) => ({ 
      type: 'FOLLOWING_IN_PROGRESS', 
      isFetching, 
      userId 
   } as const),
   setCurrentUsersPage: (pageNumber: number) => ({ 
      type: 'SET_CURRENT_USERS_PAGE',
      pageNumber 
   } as const),
   toggleIsFetching: (isFetching: boolean) => ({ 
      type: 'TOGGLE_IS_FETCHING',
      isFetching 
   } as const),
   setSearchUser: (searchUser: string) => ({ 
      type: 'SET_SEARCH_USER',
      searchUser 
   } as const)
}

 
type GetStateType = () => AppStateType
type DispatchType = Dispatch<ActionsTypes>
type ThunkType = ThunkAction<void, AppStateType, {}, ActionsTypes>

export const requestUsers = (pageSize: number, page: number): ThunkType => async (dispatch, getState: GetStateType) => {
   dispatch(usersActions.toggleIsFetching(true))
   let response = await usersAPI.getUsers(pageSize, page, getState().usersPage.searchUser)
   dispatch(usersActions.toggleIsFetching(false))
   dispatch(usersActions.setUsers(response.data))
}

const _followUnfollowFlow = async (dispatch: DispatchType, userId: number, apiMethod: any, actionCreator: (userId: number) => ActionsTypes) => {
   dispatch(usersActions.toggleFollowingProgress(true, userId))
   let response = await apiMethod(userId)
   if (response.resultCode === ResultCodesEnum.Success) {
      dispatch(actionCreator(userId))
   }
   dispatch(usersActions.toggleFollowingProgress(false, userId))
}
export const setFollow = (userId: number): ThunkType => async (dispatch) => {
   _followUnfollowFlow(dispatch, userId, usersAPI.setFollow.bind(usersAPI), usersActions.followSuccess)
}
export const setUnfollow = (userId: number): ThunkType => async (dispatch) => {
   _followUnfollowFlow(dispatch, userId, usersAPI.setUnfollow.bind(usersAPI), usersActions.unfollowSuccess)
}

export const getNewPage = (pageSize: number, page: number): ThunkType => async (dispatch, getState: GetStateType) => {
   dispatch(usersActions.toggleIsFetching(true))
   dispatch(usersActions.setCurrentUsersPage(page))
   let response = await usersAPI.getUsers(pageSize, page, getState().usersPage.searchUser)
   dispatch(usersActions.toggleIsFetching(false))
   dispatch(usersActions.setUsers(response.data))
}
export const searchUsers = (searchUser: string): ThunkType => async (dispatch, getState: GetStateType) => {
   if (searchUser !== getState().usersPage.searchUser) {
      dispatch(usersActions.setSearchUser(searchUser))
      dispatch(usersActions.setCurrentUsersPage(1))
   }
}

export default usersReducer