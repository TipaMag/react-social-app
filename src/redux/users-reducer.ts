import { GetItemsType, ResultCodesEnum } from "../api/api"
import { updateObjectInArray } from "../components/utils/object-helpers"

import {  UserType } from "../types/Users-types"
import { ThunkAction } from "redux-thunk"
import { AppStateType, InferActionsTypes } from "./redux-store"
import { Dispatch } from "redux"
import { usersAPI } from "../api/users-api"


let initialState = {
   users: {} as GetItemsType<UserType>,
   friends: {} as GetItemsType<UserType>,
   pageSize: 10,
   currentPage: {
      all: 1,
      friends: 1
   }, // start pages
   isFetching: false, // preloader
   followingInProgress: [] as Array<number>,// array of users id`s
   searchUser: ''
}
export type initialStateType = typeof initialState

const usersReducer = (state = initialState, action: UserActionsTypes): initialStateType => {
   switch (action.type) {
      case 'SET_USERS':
         return {
            ...state,
            users: action.users
         }
      case 'SET_FRIENDS':
         return {
            ...state,
            friends: action.friends
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
               : [state.followingInProgress.filter(id => id !== action.userId)]
         }
      case 'SET_CURRENT_USERS_PAGE':
         return {
            ...state,
            currentPage: {
               ...state.currentPage,
               all: action.pageNumber
            }
         }
      case 'SET_CURRENT_FRIENDS_PAGE':
         return {
            ...state,
            currentPage: {
               ...state.currentPage,
               friends: action.pageNumber
            }
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

type UserActionsTypes = InferActionsTypes<typeof usersActions>

export const usersActions = {
   setUsers: (users: GetItemsType<UserType>) => ({ 
      type: 'SET_USERS',
      users 
   } as const),
   setFriends: (friends: GetItemsType<UserType>) => ({
      type: 'SET_FRIENDS',
      friends
   } as const),
   followSuccess: (userId: number) => ({ 
      type: 'FOLLOW_SUCCESS',
      userId 
   } as const),
   unfollowSuccess: (userId: number) => ({ 
      type: 'UNFOLLOW_SUCCESS',
      userId 
   } as const),
   toggleFollowingProgress: (isFetching: boolean, userId: any) => ({ 
      type: 'FOLLOWING_IN_PROGRESS', 
      isFetching, 
      userId 
   } as const),
   setCurrentUsersPage: (pageNumber: number) => ({ 
      type: 'SET_CURRENT_USERS_PAGE',
      pageNumber 
   } as const),
   setCurrentFriendsPage: (pageNumber: number) => ({ 
      type: 'SET_CURRENT_FRIENDS_PAGE',
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
type DispatchType = Dispatch<UserActionsTypes>
type ThunkType = ThunkAction<void, AppStateType, {}, UserActionsTypes>

export const requestUsers = (friend: boolean, pageSize?: number, page?: number): ThunkType => async (dispatch, getState: GetStateType) => {
   if(!friend) {
      dispatch(usersActions.toggleIsFetching(true))
      if (page) dispatch(usersActions.setCurrentUsersPage(page))
      let response = await usersAPI.getUsers(friend, pageSize, page, getState().usersPage.searchUser)
      dispatch(usersActions.setUsers(response))
      dispatch(usersActions.toggleIsFetching(false))
   } else {
      dispatch(usersActions.toggleIsFetching(true))
      if (page) dispatch(usersActions.setCurrentFriendsPage(page))
      let response = await usersAPI.getUsers(friend, pageSize, page, getState().usersPage.searchUser)
      dispatch(usersActions.setFriends(response))
      dispatch(usersActions.toggleIsFetching(false))
   }
}

const _followUnfollowFlow = async (dispatch: DispatchType, userId: number, apiMethod: any, actionCreator: (userId: number) => UserActionsTypes) => {
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

export const searchUsers = (friend: boolean, searchUser: string): ThunkType => (dispatch, getState: GetStateType) => {
   if (searchUser !== getState().usersPage.searchUser) {
      dispatch(usersActions.setSearchUser(searchUser))
      dispatch(requestUsers(friend))
   }
}

export default usersReducer