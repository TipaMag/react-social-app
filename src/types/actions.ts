import { DialogType, MessagesDataType, MessageType } from "./Dialogs-types"
import { ProfileType, PhotosType } from "./Profile-types"
import { UsersType } from "./Users-types"
//App >
export const INITIALIZED_SUCCESS = 'INITIALIZED-SUCCESS'

export interface InitializedSuccessActionType {
    type: typeof INITIALIZED_SUCCESS
 }
//Auth >
export const SET_AUTH_USER_DATA = 'SET-AUTH-USER-DATA'
export const SET_AUTH_SMALL_PHOTO = 'SET-AUTH-SMALL-PHOTO'
export const GET_CAPTCHA_URL_SUCCESS = 'GET-CAPTCHA-URL-SUCCESS'

export interface SetAuthUserDataAction {
    type: typeof SET_AUTH_USER_DATA
    payload: {
        userId: number | null
        login: string | null
        email: string | null
        isAuth: boolean
    }
}
export interface SetAuthUserSmallPhotoAction {
    type: typeof SET_AUTH_SMALL_PHOTO
    smallPhoto: string
}
export interface GetCaptchaUrlSuccessAction {
    type: typeof GET_CAPTCHA_URL_SUCCESS
    captchaUrl: string
}
export type AuthActionTypes = SetAuthUserDataAction 
    | SetAuthUserSmallPhotoAction 
    | GetCaptchaUrlSuccessAction

//DIalogs >
export const SET_DIALOGS = 'SET_DIALOGS'
export const SET_MESSAGES = 'SET_MESSAGES'
export const CLEAR_MESSAGES = 'CLEAR_MESSAGES'
export const SET_MESSAGE = 'SET-MESSAGE'
export const SET_NEW_MESSAGES_COUNT = 'SET-MESSAGES-COUNT'

export interface SetDialogsAction {
    type: typeof SET_DIALOGS
    dialogs: Array<DialogType>
}
export interface SetMessagesAction {
    type: typeof SET_MESSAGES
    messages: MessagesDataType
}
export interface ClearMessagesAction {
    type: typeof CLEAR_MESSAGES
}
export interface SetMessageAction {
    type: typeof SET_MESSAGE
    newMessage: MessageType
}
export interface SetNewMessagesCountAction {
    type: typeof SET_NEW_MESSAGES_COUNT
    messagesCount: number
}
export type DialogsActionTypes = SetDialogsAction 
    | SetMessagesAction
    | ClearMessagesAction
    | SetMessageAction 
    | SetNewMessagesCountAction

//Profile >
export const SET_POST = 'ADD-POST'
export const SET_AUTHORIZED_USER_PROFILE = 'SET-AUTHORIZED-USER-PROFILE'
export const SET_AUTHORIZED_USER_PROFILE_STATUS = 'SET-AUTHORIZED-USER-PROFILE-STATUS'
export const SET_USER_PROFILE = 'SET-USER-PROFILE'
export const SET_USER_PROFILE_STATUS = 'SET-USER-PROFILE-STATUS'
export const SET_USER_PHOTO_SUCCES = 'SET-USER-PHOTO-SUCCES'

export interface SetAuthorizedUserProfileAction {
    type: typeof SET_AUTHORIZED_USER_PROFILE
    authorizedProfile: ProfileType
}
export interface SetAuthorizedUserProfileStatusAction {
    type: typeof SET_AUTHORIZED_USER_PROFILE_STATUS,
    authorizedProfileStatus: string
}
export interface SetUserProfileAction {
    type: typeof SET_USER_PROFILE,
    profile: ProfileType
}
export interface SetUserProfileStatusAction {
    type: typeof SET_USER_PROFILE_STATUS,
    profileStatus: string
}
export interface SetPostActionType {
    type: typeof SET_POST,
    newPostBody: string
}
export interface SetUserPhotoSuccessAction {
    type: typeof SET_USER_PHOTO_SUCCES,
    userPhotos: PhotosType
}
export type ProfileActionTypes = SetAuthorizedUserProfileAction 
    | SetAuthorizedUserProfileStatusAction 
    | SetUserProfileAction 
    | SetUserProfileStatusAction
    | SetPostActionType
    | SetUserPhotoSuccessAction

//Users >
export const FOLLOW_SUCCESS = 'FOLLOW'
export const UNFOLLOW_SUCCESS = 'UNFOLLOW'
export const SET_USERS = 'SET-USERS'
export const SET_CURRENT_USERS_PAGE = 'SET-CURRENT-USERS-PAGE'
export const TOGGLE_IS_FETCHING = 'TOGGLE-IS-FETCHING'
export const FOLLOWING_IN_PROGRESS = 'FOLLOWING-IN-PROGRESS'

export interface SetUsersAction { 
    type: typeof SET_USERS
    users: UsersType
}
export interface FollowSuccessAction { 
    type: typeof FOLLOW_SUCCESS
    userId: number
}
export interface UnfollowSuccessAction { 
    type: typeof UNFOLLOW_SUCCESS
    userId: number 
}
export interface ToggleFollowingProgressAction { 
    type: typeof FOLLOWING_IN_PROGRESS
    isFetching: boolean, 
    userId: number 
}
export interface SetCurrentUsersPageAction { 
    type: typeof SET_CURRENT_USERS_PAGE
    pageNumber: number 
}
export interface ToggleIsFetchingAction { 
    type: typeof TOGGLE_IS_FETCHING
    isFetching: boolean 
}
export type UsersActionTypes = SetUsersAction 
    | FollowSuccessAction 
    | UnfollowSuccessAction 
    | ToggleFollowingProgressAction 
    | SetCurrentUsersPageAction 
    | ToggleIsFetchingAction



// ------------------------------
export type AppActionTypes = InitializedSuccessActionType | AuthActionTypes | DialogsActionTypes | ProfileActionTypes | UsersActionTypes