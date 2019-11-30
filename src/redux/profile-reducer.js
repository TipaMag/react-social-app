import { profileAPI } from "../api/api"

const ADD_POST = 'ADD-POST'
const SET_USER_PROFILE = 'SET-USER-PROFILE'
const SET_USER_PROFILE_STATUS = 'SET-USER-PROFILE-STATUS'

let initialState = {
   postsData: [
      { id: 1, message: 'Hello World', likesCount: 12 },
      { id: 2, message: 'olololol', likesCount: 3 },
      { id: 3, message: 'lolololol 111111', likesCount: 11 },
      { id: 4, message: 'Hello World', likesCount: 33 },
      { id: 5, message: 'Hello World', likesCount: 23 }
   ],
   profile: null,
   profileStatus: ''
}

const profileReducer = (state = initialState, action) => {
   switch (action.type) {
      case ADD_POST:
         let newPost = { id: 6, message: action.newPostBody, likesCount: 0 }
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
// ---------------------- THUNK creators ---------------------
export const getUserProfile = (userId) => (dispatch) => {
   profileAPI.getProfile(userId) // profileAPI.getProfile
      .then((response) => {
         dispatch(setUserProfile(response.data))
      })
}
export const getUserProfileStatus = (userId) => (dispatch) => {
   profileAPI.getProfileStatus(userId) // profileAPI.getProfileStatus
      .then((response) => {
         dispatch(setUserProfileStatus(response.data))
      })
}
export const updateProfileStatus = (userStatus) => (dispatch) => {
   profileAPI.updateProfileStatus(userStatus) // profileAPI.updateProfileStatus
      .then((response) => {
         if (response.data.resultCode === 0) {
            dispatch(setUserProfileStatus(userStatus))
         }
      })
}


export default profileReducer