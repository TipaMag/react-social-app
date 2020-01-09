import { authAPI, securityAPI } from "../api/api"
import { stopSubmit } from 'redux-form'

const SET_AUTH_USER_DATA = 'auth/SET-AUTH-USER-DATA'
const SET_AUTH_SMALL_PHOTO = 'auth/SET-AUTH-SMALL-PHOTO'
const GET_CAPTCHA_URL_SUCCESS = 'auth/GET-CAPTCHA-URL-SUCCESS'

let initialState = {
   userId: null,
   login: null,
   email: null,
   isAuth: false,
   smallPhoto: null,
   captchaUrl: null
}

const authReducer = (state = initialState, action) => {
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

export const setAuthUserData = (userId, login, email, isAuth) => ({
   type: SET_AUTH_USER_DATA,
   payload: {
      userId,
      login,
      email,
      isAuth
   }
})
export const setAuthUserSmallPhoto = (smallPhoto) => ({
   type: SET_AUTH_SMALL_PHOTO,
   smallPhoto
})
export const getCaptchaUrlSuccess = (captchaUrl) => ({
   type: GET_CAPTCHA_URL_SUCCESS,
   payload: {
      captchaUrl
   }
})
// ---------------------- THUNK creators ---------------------
export const getAuthUserData = () => async (dispatch) => {
   let response = await authAPI.getAuth() //---------------> authAPI.getAuth() (return - для возврата промиса в app-reducer для инициализации)
   if (response.data.resultCode === 0) {
      let { id, login, email } = response.data.data
      dispatch(setAuthUserData(id, login, email, true))
   }
}
export const login = (email, password, rememberMe, captha) => async (dispatch) => {
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
export const logout = () => async (dispatch) => {
   let response = await authAPI.logout()
   if (response.data.resultCode === 0) {
      dispatch(setAuthUserData(null, null, null, false))
      dispatch(getAuthUserData())
   }
}

export const getCaptchaUrl = () => async (dispatch) => {
   let response = await securityAPI.getCaptchaUrl()
   const captchaUrl = response.data.url
   dispatch(getCaptchaUrlSuccess(captchaUrl))
}

export default authReducer