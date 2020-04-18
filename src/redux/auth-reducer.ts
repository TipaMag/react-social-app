import { authAPI, securityAPI, ResultCodesEnum, ResultCodeForCaptcha } from "../api/api"
import { stopSubmit, FormAction } from 'redux-form'
import { getUserProfile } from "./profile-reducer"

import { AuthInitial } from "../types/Auth-types"
// import { SET_AUTH_USER_DATA, GET_CAPTCHA_URL_SUCCESS, SET_AUTH_SMALL_PHOTO, AuthActionTypes, AppActionTypes } from "../types/actions"
import { ThunkAction } from "redux-thunk"
import { AppStateType, InferActionsTypes } from "./redux-store"

   
let initialState: AuthInitial = {
   userId: null,
   login: null,
   email: null,
   isAuth: false,
   smallPhoto: null,
   captchaUrl: null
}

const authReducer = (state = initialState, action: AuthActionsTypes): AuthInitial => {
   switch (action.type) {
      case 'SET_AUTH_USER_DATA':
         return {
            ...state,
            ...action.payload
         }
      case 'GET_CAPTCHA_URL_SUCCESS':
         return {
            ...state,
            captchaUrl: action.captchaUrl
         }
      case 'SET_AUTH_SMALL_PHOTO':
         return {
            ...state,
            smallPhoto: action.smallPhoto
         }
      default:
         return state
   }
}

export type AuthActionsTypes = InferActionsTypes<typeof authActions>

export const authActions = {
   setAuthUserData: (userId: number | null, login: string | null, email: string | null, isAuth: boolean) => ({
      type: 'SET_AUTH_USER_DATA',
      payload: { userId, login, email, isAuth }
   } as const),
   setAuthUserSmallPhoto: (smallPhoto: string) => ({
      type: 'SET_AUTH_SMALL_PHOTO',
      smallPhoto
   } as const),
   getCaptchaUrlSuccess: (captchaUrl: string) => ({
      type: 'GET_CAPTCHA_URL_SUCCESS',
      captchaUrl
   } as const)
}

type ActionsTypes = AuthActionsTypes | FormAction
type ThunkType = ThunkAction<void, AppStateType, {}, ActionsTypes>

export const getAuthUserData = (): ThunkType => async (dispatch) => {
   let response = await authAPI.getAuth()
   if (response.resultCode === ResultCodesEnum.Success) {
      let { id, login, email } = response.data
      dispatch(authActions.setAuthUserData(id, login, email, true))
      dispatch(getUserProfile(id))
   }
}
export const login = (email: string, password: string, rememberMe?: boolean, captha?: string): ThunkType => async (dispatch) => {
   let response = await authAPI.login(email, password, rememberMe, captha)
   if (response.resultCode === ResultCodesEnum.Success) {
      dispatch(getAuthUserData())
   }
   if (response.resultCode === ResultCodesEnum.Error) {
      let message = response.messages.length > 0 ? response.messages[0] : 'Some error'
      dispatch(stopSubmit('login', { _error: message }))
   }
   if (response.resultCode === ResultCodeForCaptcha.CaptchaIsRequired) {
      dispatch(getCaptchaUrl())
   }
}
export const logout = (): ThunkType => async (dispatch) => {
   let response = await authAPI.logout()
   if (response.resultCode === ResultCodesEnum.Success) {
      dispatch(authActions.setAuthUserData(null, null, null, false))
   }
}
export const getCaptchaUrl = (): ThunkType => async (dispatch) => {
   let response = await securityAPI.getCaptchaUrl()
   const captchaUrl = response.url
   dispatch(authActions.getCaptchaUrlSuccess(captchaUrl))
}

export default authReducer