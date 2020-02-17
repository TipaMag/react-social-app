import { profileAPI, dialogsAPI } from "../api/api"
import { setAuthUserSmallPhoto } from './auth-reducer'
import { setNewMessagesCount } from "./dialogs-reducer"
import { stopSubmit, reset } from 'redux-form'
import { PostType, ProfileType, PhotosType } from "../types/types"

const SET_POST = 'profile/ADD-POST'
const SET_AUTHORIZED_USER_PROFILE = 'profile/SET-AUTHORIZED-USER-PROFILE'
const SET_AUTHORIZED_USER_PROFILE_STATUS = 'profile/SET-AUTHORIZED-USER-PROFILE-STATUS'
const SET_USER_PROFILE = 'profile/SET-USER-PROFILE'
const SET_USER_PROFILE_STATUS = 'profile/SET-USER-PROFILE-STATUS'
const SET_USER_PHOTO_SUCCES = 'profile/SET-USER-PHOTO-SUCCES'


let initialState = {
   postsData: [
      {id: 1,message: 'Hello World',likesCount: 12},
      {id: 2,message: 'test post 2',likesCount: 3},
      {id: 3,message: 'test post 3',likesCount: 11}
   ] as Array<PostType>,
   autorizedProfile: null as ProfileType | null,
   autorizedProfileStatus: '',
   profile: null as ProfileType | null,
   profileStatus: ''
}
type InitialStateType = typeof initialState

const profileReducer = (state = initialState, action: any): InitialStateType => {
   switch (action.type) {
      case SET_POST:
         let newPost = {
            id: 6,
            message: action.newPostBody,
            likesCount: 0
         }
         return {
            ...state,
            postsData: [newPost, ...state.postsData],
         }
      case SET_AUTHORIZED_USER_PROFILE:
         return {
            ...state,
            autorizedProfile: action.authorizedProfile
         }
      case SET_AUTHORIZED_USER_PROFILE_STATUS:
         return {
            ...state,
            autorizedProfileStatus: action.authorizedProfileStatus
         }
      case SET_USER_PROFILE:
         return {
            ...state,
            profile: action.profile
         }
      case SET_USER_PROFILE_STATUS:
         return {
            ...state,
            profileStatus: action.profileStatus
         }
      case SET_USER_PHOTO_SUCCES:
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

type SetAuthorizedUserProfileActionType = {
   type: typeof SET_AUTHORIZED_USER_PROFILE,
   authorizedProfile: ProfileType
}
export const setAuthorizedUserProfile = (authorizedProfile: ProfileType): SetAuthorizedUserProfileActionType => ({
   type: SET_AUTHORIZED_USER_PROFILE,
   authorizedProfile
})
type SetAuthorizedUserProfileStatusActionType = {
   type: typeof SET_AUTHORIZED_USER_PROFILE_STATUS,
   authorizedProfileStatus: string
}
export const setAuthorizedUserProfileStatus = (authorizedProfileStatus: string): SetAuthorizedUserProfileStatusActionType => ({
   type: SET_AUTHORIZED_USER_PROFILE_STATUS,
   authorizedProfileStatus
})
type SetUserProfileActionType = {
   type: typeof SET_USER_PROFILE,
   profile: ProfileType
}
export const setUserProfile = (profile: ProfileType): SetUserProfileActionType => ({
   type: SET_USER_PROFILE,
   profile
})
type SetUserProfileStatusActionType = {
   type: typeof SET_USER_PROFILE_STATUS,
   profileStatus: string
}
export const setUserProfileStatus = (profileStatus: string): SetUserProfileStatusActionType => ({
   type: SET_USER_PROFILE_STATUS,
   profileStatus
})
type SetPostActionType = {
   type: typeof SET_POST,
   newPostBody: string
}
export const setPost = (newPostBody: string): SetPostActionType => ({
   type: SET_POST,
   newPostBody
})
type SetUserPhotoSuccessActionType = {
   type: typeof SET_USER_PHOTO_SUCCES,
   userPhotos: PhotosType
}
export const setUserPhotoSuccess = (userPhotos: PhotosType): SetUserPhotoSuccessActionType  => ({
   type: SET_USER_PHOTO_SUCCES,
   userPhotos
})

export const getUserProfile = (userId: number) => async (dispatch: any, getState: any) => {
   if (userId === getState().auth.userId) {
      let response = await profileAPI.getProfile(userId)
      dispatch(setAuthorizedUserProfile(response.data))
      dispatch(setAuthUserSmallPhoto(response.data.photos.small))
      if (getState().auth.isAuth) {
         let responseCount = await dialogsAPI.getNewMessagesCount()
         dispatch(setNewMessagesCount(responseCount.data)) 
      }
      return
   }
   let response = await profileAPI.getProfile(userId)
   dispatch(setUserProfile(response.data))
}
export const getUserProfileStatus = (userId: number) => async (dispatch: any, getState: any) => {
   if (userId === getState().auth.userId) {
      let response = await profileAPI.getProfileStatus(userId)
      dispatch(setAuthorizedUserProfileStatus(response.data))
      return
   }
   let response = await profileAPI.getProfileStatus(userId)
   dispatch(setUserProfileStatus(response.data))
}
export const updateProfileStatus = (userStatus: string) => async (dispatch: any) => {
   let response = await profileAPI.updateProfileStatus(userStatus)
   if (response.data.resultCode === 0) {
      dispatch(setAuthorizedUserProfileStatus(userStatus))
   }
}
export const setProfilePhoto = (formData: any) => async (dispatch: any) => {
   let response = await profileAPI.setProfilePhoto(formData)
   if (response.data.resultCode === 0) {
      dispatch(setUserPhotoSuccess(response.data.data.photos))
      dispatch(setAuthUserSmallPhoto(response.data.data.photos.small))
   }
}
export const saveProfileInfo = (formData: any) => async (dispatch: any, getState: any) => {
   let userId = getState().auth.userId
   let response = await profileAPI.saveProfileInfo(formData)
   if (response.data.resultCode === 0) {
      let response = await profileAPI.getProfile(userId)
      dispatch(setAuthorizedUserProfile(response.data))
   } else {
      let message = response.data.messages.length > 0 ? response.data.messages[0] : 'Some error'
      dispatch(stopSubmit('edit-profile', { _error: message }))
      return Promise.reject(message)
   }
}
export const addPost = (formData: any) => (dispatch: any) => {
   dispatch(setPost(formData))
   dispatch(reset('profileAddPostForm'))
}


export default profileReducer