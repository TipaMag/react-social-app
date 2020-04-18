import { profileAPI, ResultCodesEnum } from "../api/api"
import { authActions, AuthActionsTypes } from './auth-reducer'
import { getNewMessagesCount } from "./dialogs-reducer"
import { stopSubmit, reset, FormAction } from 'redux-form'

import { ProfileInitial, ProfileType, PhotosType } from "../types/Profile-types"
// import { SET_POST, SET_AUTHORIZED_USER_PROFILE, SET_AUTHORIZED_USER_PROFILE_STATUS, SET_USER_PROFILE, 
//    SET_USER_PROFILE_STATUS, SET_USER_PHOTO_SUCCES, 
//    ProfileActionTypes,
//    AppActionTypes, } from "../types/actions"
import { AppStateType, InferActionsTypes } from "./redux-store"
import { ThunkAction } from "redux-thunk"


let initialState: ProfileInitial = {
   postsData: [
      {id: 1,message: 'Hello World',likesCount: 12},
      {id: 2,message: 'test post 2',likesCount: 3},
      {id: 3,message: 'test post 3',likesCount: 11}
   ],
   autorizedProfile: null,
   autorizedProfileStatus: '',
   profile: null,
   profileStatus: ''
}

const profileReducer = (state = initialState, action: ProfileActionsTypes): ProfileInitial => {
   switch (action.type) {
      case 'SET_POST':
         let newPost = {
            id: 6,
            message: action.newPostBody,
            likesCount: 0
         }
         return {
            ...state,
            postsData: [newPost, ...state.postsData],
         }
      case 'SET_AUTHORIZED_USER_PROFILE':
         return {
            ...state,
            autorizedProfile: action.authorizedProfile
         }
      case 'SET_AUTHORIZED_USER_PROFILE_STATUS':
         return {
            ...state,
            autorizedProfileStatus: action.authorizedProfileStatus
         }
      case 'SET_USER_PROFILE':
         return {
            ...state,
            profile: action.profile
         }
      case 'SET_USER_PROFILE_STATUS':
         return {
            ...state,
            profileStatus: action.profileStatus
         }
      case 'SET_USER_PHOTO_SUCCES':
         return {
            ...state,
            autorizedProfile: {
               ...state.autorizedProfile,
               photos: action.userPhotos
            } as ProfileType
         }
      default:
         return state
   }
}

export type ProfileActionsTypes = InferActionsTypes<typeof profileActions>

export const profileActions = {
   setAuthorizedUserProfile: (authorizedProfile: ProfileType) => ({
      type: 'SET_AUTHORIZED_USER_PROFILE',
      authorizedProfile
   } as const),
   setAuthorizedUserProfileStatus: (authorizedProfileStatus: string) => ({
      type: 'SET_AUTHORIZED_USER_PROFILE_STATUS',
      authorizedProfileStatus
   } as const),
   setUserProfile: (profile: ProfileType) => ({
      type: 'SET_USER_PROFILE',
      profile
   } as const),
   setUserProfileStatus: (profileStatus: string) => ({
      type: 'SET_USER_PROFILE_STATUS',
      profileStatus
   } as const),
   setPost: (newPostBody: string) => ({
      type: 'SET_POST',
      newPostBody
   } as const),
   setUserPhotoSuccess: (userPhotos: PhotosType) => ({
      type: 'SET_USER_PHOTO_SUCCES',
      userPhotos
   } as const)
}

type ActionsTypes = ProfileActionsTypes | AuthActionsTypes | FormAction
type GetStateType = () => AppStateType
type ThunkType = ThunkAction<void, AppStateType, {}, ActionsTypes>

export const getUserProfile = (userId: number): ThunkType => async (dispatch, getState: GetStateType) => {
   if (userId === getState().auth.userId) {
      let response = await profileAPI.getProfile(userId)
      dispatch(profileActions.setAuthorizedUserProfile(response.data))
      dispatch(authActions.setAuthUserSmallPhoto(response.data.photos.small))
      dispatch(getUserProfileStatus(userId))
      dispatch(getNewMessagesCount())
      return
   }
   let response = await profileAPI.getProfile(userId)
   dispatch(profileActions.setUserProfile(response.data))
   dispatch(getUserProfileStatus(userId))
}
export const getUserProfileStatus = (userId: number): ThunkType => async (dispatch, getState: GetStateType) => {
   let response = await profileAPI.getProfileStatus(userId)
   if (userId === getState().auth.userId) {
      dispatch(profileActions.setAuthorizedUserProfileStatus(response.data))
      return
   }
   dispatch(profileActions.setUserProfileStatus(response.data))
}
export const updateProfileStatus = (status: string): ThunkType => async (dispatch) => {
   let response = await profileAPI.updateProfileStatus(status)
   if (response.resultCode === ResultCodesEnum.Success) {
      dispatch(profileActions.setAuthorizedUserProfileStatus(status))
   }
}
export const setProfilePhoto = (formData: FormData): ThunkType => async (dispatch) => {
   let response = await profileAPI.setProfilePhoto(formData)
   if (response.resultCode === ResultCodesEnum.Success) {
      dispatch(profileActions.setUserPhotoSuccess(response.data.photos))
      dispatch(authActions.setAuthUserSmallPhoto(response.data.photos.small))
   }
}
export const saveProfileInfo = (formData: any): ThunkType => async (dispatch, getState: GetStateType) => {
   let userId = getState().auth.userId
   let response = await profileAPI.saveProfileInfo(formData)
   if (response.resultCode === ResultCodesEnum.Success) {
      let response = await profileAPI.getProfile(userId)
      dispatch(profileActions.setAuthorizedUserProfile(response.data))
   } else {
      let message = response.messages.length > 0 ? response.messages[0] : 'Some error'
      dispatch(stopSubmit('edit-profile', { _error: message }))
      return Promise.reject(message)
   }
}
export const addPost = (formData: any): ThunkType => (dispatch) => {
   dispatch(profileActions.setPost(formData))
   dispatch(reset('profileAddPostForm'))
}


export default profileReducer