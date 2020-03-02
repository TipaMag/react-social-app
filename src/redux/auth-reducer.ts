import { authAPI, securityAPI, ResultCodesEnum, ResultCodeForCaptcha } from "../api/api"
import { stopSubmit } from 'redux-form'
import { getUserProfile } from "./profile-reducer"

import { AuthInitial } from "../types/Auth-types"
import { SET_AUTH_USER_DATA, GET_CAPTCHA_URL_SUCCESS, SET_AUTH_SMALL_PHOTO, AuthActionTypes, AppActionTypes } from "../types/actions"
import { ThunkAction } from "redux-thunk"
import { AppStateType } from "./redux-store"

   
let initialState: AuthInitial = {
   userId: null,
   login: null,
   email: null,
   isAuth: false,
   smallPhoto: null,
   captchaUrl: null
}

const authReducer = (state = initialState, action: AuthActionTypes): AuthInitial => {
   switch (action.type) {
      case SET_AUTH_USER_DATA:
         return {
            ...state,
            ...action.payload
         }
      case GET_CAPTCHA_URL_SUCCESS:
         return {
            ...state,
            captchaUrl: action.captchaUrl
         }
      case SET_AUTH_SMALL_PHOTO:
         return {
            ...state,
            smallPhoto: action.smallPhoto
         }
      default:
         return state
   }
}

export const setAuthUserData = (userId: number | null, login: string | null, email: string | null, isAuth: boolean): AppActionTypes => ({
   type: SET_AUTH_USER_DATA,
   payload: { userId, login, email, isAuth }
})
export const setAuthUserSmallPhoto = (smallPhoto: string): AppActionTypes => ({
   type: SET_AUTH_SMALL_PHOTO,
   smallPhoto
})
export const getCaptchaUrlSuccess = (captchaUrl: string): AppActionTypes => ({
   type: GET_CAPTCHA_URL_SUCCESS,
   captchaUrl
})

type ThunkType = ThunkAction<void, AppStateType, unknown, AppActionTypes>
export const getAuthUserData = (): ThunkType => async (dispatch) => {
   let response = await authAPI.getAuth()
   if (response.resultCode === ResultCodesEnum.Success) {
      let { id, login, email } = response.data
      dispatch(setAuthUserData(id, login, email, true))
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
      dispatch(setAuthUserData(null, null, null, false))
   }
}
export const getCaptchaUrl = (): ThunkType => async (dispatch) => {
   let response = await securityAPI.getCaptchaUrl()
   const captchaUrl = response.url
   dispatch(getCaptchaUrlSuccess(captchaUrl))
}

export default authReducer