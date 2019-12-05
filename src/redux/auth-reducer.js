import {
   authAPI,
   profileAPI
} from "../api/api"
import {
   stopSubmit
} from 'redux-form'

const SET_AUTH_USER_DATA = 'SET-AUTH-USER-DATA'
const SET_AUTH_SMALL_PHOTO = 'SET-AUTH-SMALL-PHOTO'

let initialState = {
   userId: null,
   login: null,
   email: null,
   isAuth: false,
   smallPhoto: null
}

const authReducer = (state = initialState, action) => {
   switch (action.type) {
      case SET_AUTH_USER_DATA:
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
// ---------------------- THUNK creators ---------------------
export const getAuthUserData = () => (dispatch) => {
   return authAPI.getAuth() //---------------> authAPI.getAuth() (return - для возврата промиса в app-reducer для инициализации)
      .then((response) => {
         if (response.data.resultCode === 0) {
            let { id, login, email } = response.data.data
            dispatch(setAuthUserData(id, login, email, true))
            profileAPI.getProfile(id) //--------------------------------> profileAPI.getProfile()
               .then((response) => {
                  if (!response.data.photos.small) {
                     dispatch(setAuthUserSmallPhoto(response.data.photos.small))
                  }
               })
         }
      })
}
export const login = (email, password, rememberMe) => (dispatch) => {

   authAPI.login(email, password, rememberMe)
      .then((response) => {
         if (response.data.resultCode === 0) {
            dispatch(getAuthUserData())
         }
         if (response.data.resultCode === 1) {
            let message = response.data.messages.length > 0 ? response.data.messages[0] : 'Some error'
            let action = stopSubmit('login', { _error: message })
            dispatch(action)
         }
      })
}
export const logout = () => (dispatch) => {
   authAPI.logout()
      .then((response) => {
         if (response.data.resultCode === 0) {
            dispatch(setAuthUserData(null, null, null, false))

            dispatch(getAuthUserData())
         }
      })
}

export default authReducer