import { authAPI, profileAPI } from "../api/api"

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
            ...action.data,
            isAuth: true
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

export const setAuthUserData = (userId, login, email) => ({
   type: SET_AUTH_USER_DATA,
   data: {
      userId,
      login,
      email
   }
})
export const setAuthUserSmallPhoto = (smallPhoto) => ({
   type: SET_AUTH_SMALL_PHOTO,
   smallPhoto
})
// ---------------------- THUNK creators ---------------------
export const getAuthUserData = () => (dispatch) => {
   authAPI.getAuth() //-------------------------------------------------> authAPI.getAuth()
      .then((response) => {
         if (response.data.resultCode === 0) {
            let { id, login, email } = response.data.data
            dispatch(setAuthUserData(id, login, email))

            profileAPI.getProfile(id) //--------------------------------> profileAPI.getProfile()
               .then((response) => {
                  if (!response.data.photos.small) {
                     dispatch(setAuthUserSmallPhoto(response.data.photos.small))
                  }
               })
         }
      })
}
export const login = (userEmail, userPassword, rememberMe) => (dispatch) => {
   authAPI.login(userEmail, userPassword, rememberMe)
      .then((response) => {
         console.log(response.data)
      })
}
export const logout = () => (dispatch) => {
   authAPI.logout()
      .then((response) => {
         console.log(response.data)
      })
}

export default authReducer