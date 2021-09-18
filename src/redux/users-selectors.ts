// import { createSelector } from "reselect"
import { AppStateType } from "./redux-store"

// const getUsersSelector = (state: AppStateType) => {
//     return state.usersPage.users.items
// }

// export const getUsers = createSelector(
//     [getUsersSelector],
//     (items) => {
//         return items.filter(item => true)
//     }
// )

export const getUsers = (state: AppStateType) => state.usersPage.users
export const getFriends = (state: AppStateType) => state.usersPage.friends
export const getAuth = (state: AppStateType) => state.auth.isAuth
export const getUsersPageSize = (state: AppStateType) => state.usersPage.pageSize
export const getCurrentPage = (state: AppStateType) => state.usersPage.currentPage
export const getIsFetching = (state: AppStateType) => state.usersPage.isFetching
export const getFollowingInProgress = (state: AppStateType) => state.usersPage.followingInProgress
export const getSearchUser = (state: AppStateType) => state.usersPage.searchUser

