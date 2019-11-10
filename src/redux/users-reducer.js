const FOLLOW = 'FOLLOW'
const UNFOLLOW = 'UNFOLLOW'
const SET_USERS = 'SET-USERS'
const SET_CURRENT_USERS_PAGE = 'SET-CURRENT-USERS-PAGE'
const TOGGLE_IS_FETCHING = 'TOGGLE-IS-FETCHING'
const FOLLOWING_IN_PROGRESS = 'FOLLOWING-IN-PROGRESS'

let initialState = {
   users: [],
   pageSize: 5,
   totalUsersCount: 0,
   currentPage: 1,
   isFetching: false, // preloader
   followingInProgress: false // following button click disable
}

const usersReducer = (state = initialState, action) => {
   switch (action.type) {
      case SET_USERS:
         return {
            ...state,
            users: action.users.items,
            totalUsersCount: action.users.totalCount,
         }
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
      case FOLLOWING_IN_PROGRESS:
         return {
            ...state,
            followingInProgress: action.isFetching
         }
      case SET_CURRENT_USERS_PAGE:
         return {
            ...state,
            currentPage: action.pageNumber
         }
      case TOGGLE_IS_FETCHING:
         return {
            ...state,
            isFetching: action.isFetching
         }
      default:
         return state
   }
}

export const setUsers = (users) => ({
   type: SET_USERS,
   users
})
export const follow = (userId) => ({
   type: FOLLOW,
   userId
})
export const unfollow = (userId) => ({
   type: UNFOLLOW,
   userId
})
export const toggleFollowingProgress = (isFetching) => ({
   type: FOLLOWING_IN_PROGRESS,
   isFetching
})
export const setCurrentUsersPage = (pageNumber) => ({
   type: SET_CURRENT_USERS_PAGE,
   pageNumber
})
export const toggleIsFetching = (isFetching) => ({
   type: TOGGLE_IS_FETCHING,
   isFetching
})

export default usersReducer