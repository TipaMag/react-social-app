import { authAPI, securityAPI } from "../api/api"
import { stopSubmit } from 'redux-form'
import { getUserProfile } from "./profile-reducer"

const SET_AUTH_USER_DATA = 'auth/SET-AUTH-USER-DATA'
const SET_AUTH_SMALL_PHOTO = 'auth/SET-AUTH-SMALL-PHOTO'
const GET_CAPTCHA_URL_SUCCESS = 'auth/GET-CAPTCHA-URL-SUCCESS'

let initialState = {
   userId: null as number | null,
   login: null as string | null,
   email: null as string | null,
   isAuth: false as boolean,
   smallPhoto: null as string | null,
   captchaUrl: null as string | null
}
type InitialStateType = typeof initialState

const authReducer = (state = initialState, action: any): InitialStateType => {
   switch (action.type) {
      case SET_AUTH_USER_DATA:
      case GET_CAPTCHA_URL_SUCCESS:
         return {
            ...state,
            ...action.payload
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


type setAuthUserDataActionType = {
   type: typeof SET_AUTH_USER_DATA,
   payload: SetAuthUserDataActionPayloadType
}
type SetAuthUserDataActionPayloadType = {
   userId: number | null,
   login: string | null,
   email: string | null,
   isAuth: boolean
}
export const setAuthUserData = (userId: number | null, login: string | null, email: string | null, isAuth: boolean): setAuthUserDataActionType => ({
   type: SET_AUTH_USER_DATA,
   payload: {
      userId,
      login,
      email,
      isAuth
   }
})

type SetAuthUserSmallPhotoActionType = {
   type: typeof SET_AUTH_SMALL_PHOTO,
   smallPhoto: string
}
export const setAuthUserSmallPhoto = (smallPhoto: string): SetAuthUserSmallPhotoActionType => ({
   type: SET_AUTH_SMALL_PHOTO,
   smallPhoto
})

type GetCaptchaUrlSuccessActionType = {
   type: typeof GET_CAPTCHA_URL_SUCCESS,
   payload: {
      captchaUrl: string
   }
}
export const getCaptchaUrlSuccess = (captchaUrl: string): GetCaptchaUrlSuccessActionType => ({
   type: GET_CAPTCHA_URL_SUCCESS,
   payload: {
      captchaUrl
   }
})

export const getAuthUserData = () => async (dispatch: any) => {
   let response = await authAPI.getAuth()
   if (response.data.resultCode === 0) {
      let { id, login, email } = response.data.data
      dispatch(setAuthUserData(id, login, email, true))
      dispatch(getUserProfile(id))
   }
}
export const login = (email: any, password: any, rememberMe: any, captha: any) => async (dispatch: any) => {
   let response = await authAPI.login(email, password, rememberMe, captha)
   if (response.data.resultCode === 0) {
      dispatch(getAuthUserData())
   }
   if (response.data.resultCode === 1) {
      let message = response.data.messages.length > 0 ? response.data.messages[0] : 'Some error'
      dispatch(stopSubmit('login', { _error: message }))
   }
   if (response.data.resultCode === 10) {
      dispatch(getCaptchaUrl())
   }
}
export const logout = () => async (dispatch: any) => {
   let response = await authAPI.logout()
   if (response.data.resultCode === 0) {
      dispatch(setAuthUserData(null, null, null, false))
   }
}

export const getCaptchaUrl = () => async (dispatch: any) => {
   let response = await securityAPI.getCaptchaUrl()
   const captchaUrl = response.data.url
   dispatch(getCaptchaUrlSuccess(captchaUrl))
}

export default authReducer