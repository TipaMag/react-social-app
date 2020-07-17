import { AppStateType, InferActionsTypes } from "./redux-store"
import { ThunkAction } from "redux-thunk"
import { stopSubmit, FormAction } from 'redux-form'

import { getUserProfile } from "./profile-reducer"
import { ResultCodesEnum, ResultCodeForCaptchaEnum } from "../api/api"
import { authAPI } from "../api/auth.api"
import { securityAPI } from "../api/security-api"
import { AppActionsTypes, appActions } from "./app-reducer"


let initialState = {
   userId: null as number | null,
   login: null as string | null,
   email: null as string | null,
   isAuth: false,
   smallPhoto: null as string | null,
   captchaUrl: null as string | null
}
type AuthInitialStateType = typeof initialState

const authReducer = (state = initialState, action: AuthActionsTypes): AuthInitialStateType => {
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
      case 'RESET_AUTH_DATA':
         return initialState
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
   } as const),
   resetAuthData: () => ({
      type: 'RESET_AUTH_DATA'
   } as const)
}

type ActionsTypes = AuthActionsTypes| AppActionsTypes | FormAction
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
   switch (response.resultCode) {
      case ResultCodesEnum.Success:
         dispatch(getAuthUserData())
         break
      case ResultCodesEnum.Error:
         let message = response.messages.length > 0 ? response.messages[0] : 'Some error'
         dispatch(stopSubmit('login', { _error: message }))
         break
      case ResultCodeForCaptchaEnum.CaptchaIsRequired:
         dispatch(getCaptchaUrl())
         break
      default:
         console.log(response.resultCode)
   }
}
export const getCaptchaUrl = (): ThunkType => async (dispatch) => {
   let data = await securityAPI.getCaptchaUrl()
   const captchaUrl = data.url
   dispatch(authActions.getCaptchaUrlSuccess(captchaUrl))
}
export const logout = (): ThunkType => async (dispatch) => {
   let response = await authAPI.logout()
   if (response.resultCode === ResultCodesEnum.Success) {
      dispatch(authActions.resetAuthData())
      dispatch({type: 'RESET'})
      dispatch(appActions.initializedSuccess())
   }
}
export default authReducer