const FOLLOW = 'FOLLOW'
const UNFOLLOW = 'UNFOLLOW'
const SET_USERS = 'SET-USERS'
const SET_CURRENT_USERS_PAGE = 'SET-CURRENT-USERS-PAGE'

let initialState = {
   users: [],
   pageSize: 5,
   totalUsersCount: 0,
   currentPage: 1
}

const usersReducer = (state = initialState, action) => {
   switch (action.type) {
      case FOLLOW:
         return {
            ...state,
            users: state.users.map(user => {
               if (user.id === action.userId) {
                  return { ...user, followed: true }
               }
               return user
            })
         }
      case UNFOLLOW:
         return {
            ...state,
            users: state.users.map(user => {
               if (user.id === action.userId) {
                  return { ...user, followed: false }
               }
               return user
            })
         }
      case SET_USERS:
         return {
            ...state,
            users: action.users.items,
            totalUsersCount: action.users.totalCount,
         }
      case SET_CURRENT_USERS_PAGE:
         return {
            ...state,
            currentPage: action.pageNumber
         }
      default:
         return state
   }
}

export const followActionCreator = (userId) => ({
   type: FOLLOW,
   userId
})
export const unfollowActionCreator = (userId) => ({
   type: UNFOLLOW,
   userId
})
export const setUsersActionCreator = (users) => ({
   type: SET_USERS,
   users
})
export const setCurrentUsersPageActionCreator = (pageNumber) => ({
   type: SET_CURRENT_USERS_PAGE,
   pageNumber
})

export default usersReducer