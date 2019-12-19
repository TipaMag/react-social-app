import {
   profileAPI
} from "../api/api"
import {
   stopSubmit
} from 'redux-form'

const ADD_POST = 'profile/ADD-POST'
const SET_USER_PROFILE = 'profile/SET-USER-PROFILE'
const SET_USER_PROFILE_STATUS = 'profile/SET-USER-PROFILE-STATUS'
const SET_USER_PHOTO_SUCCES = 'profile/SET-USER-PHOTO-SUCCES'

let initialState = {
   postsData: [{
         id: 1,
         message: 'Hello World',
         likesCount: 12
      },
      {
         id: 2,
         message: 'olololol',
         likesCount: 3
      },
      {
         id: 3,
         message: 'lolololol 111111',
         likesCount: 11
      },
      {
         id: 4,
         message: 'Hello World',
         likesCount: 33
      },
      {
         id: 5,
         message: 'Hello World',
         likesCount: 23
      }
   ],
   profile: null,
   profileStatus: ''
}

const profileReducer = (state = initialState, action) => {
   switch (action.type) {
      case ADD_POST:
         let newPost = {
            id: 6,
            message: action.newPostBody,
            likesCount: 0
         }
         return {
            ...state,
            postsData: [newPost, ...state.postsData],
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
            profile: {...state.profile, photos: action.userPhotos}
         }
      default:
         return state
   }
}

export const setUserProfile = (profile) => ({
   type: SET_USER_PROFILE,
   profile
})
export const setUserProfileStatus = (profileStatus) => ({
   type: SET_USER_PROFILE_STATUS,
   profileStatus
})
export const addPost = (newPostBody) => ({
   type: ADD_POST,
   newPostBody
})
export const setUserPhotoSuccess = (userPhotos) => ({
   type: SET_USER_PHOTO_SUCCES,
   userPhotos
})
// ---------------------- THUNK creators ---------------------
export const getUserProfile = (userId) => async (dispatch) => {
   let response = await profileAPI.getProfile(userId)
   dispatch(setUserProfile(response.data))
}
export const getUserProfileStatus = (userId) => async (dispatch) => {
   let response = await profileAPI.getProfileStatus(userId)
   dispatch(setUserProfileStatus(response.data))
}
export const updateProfileStatus = (userStatus) => async (dispatch) => {
   let response = await profileAPI.updateProfileStatus(userStatus)
   if (response.data.resultCode === 0) {
      dispatch(setUserProfileStatus(userStatus))
   }
}
export const setProfilePhoto = (formData) => async (dispatch) => {
   let response = await profileAPI.setProfilePhoto(formData)
   if (response.data.resultCode === 0) {
      dispatch(setUserPhotoSuccess(response.data.data.photos))
   }
}
export const saveProfileInfo = (formData) => async (dispatch, getState) => {
   let userId = getState().auth.userId
   let response = await profileAPI.saveProfileInfo(formData)
   if (response.data.resultCode === 0) {
      dispatch(getUserProfile(userId))
   } else {
      let message = response.data.messages.length > 0 ? response.data.messages[0] : 'Some error'
      dispatch(stopSubmit('edit-profile', { _error: message }))
      return Promise.reject(message)
   }
}

export default profileReducer


// export const getUserProfile = (userId) => (dispatch) => {
//    profileAPI.getProfile(userId) // profileAPI.getProfile
//       .then((response) => {
//          dispatch(setUserProfile(response.data))
//       })
// }
// export const getUserProfileStatus = (userId) => (dispatch) => {
//    profileAPI.getProfileStatus(userId) // profileAPI.getProfileStatus
//       .then((response) => {
//          dispatch(setUserProfileStatus(response.data))
//       })
// }
// export const updateProfileStatus = (userStatus) => (dispatch) => {
//    profileAPI.updateProfileStatus(userStatus) // profileAPI.updateProfileStatus
//       .then((response) => {
//          if (response.data.resultCode === 0) {
//             dispatch(setUserProfileStatus(userStatus))
//          }
//       })
// }