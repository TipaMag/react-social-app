import { createSelector } from "reselect"
import { AppStateType } from "./redux-store"

const getUsersSelector = (state: AppStateType) => {
    return state.usersPage.users.items
}
export const getUsers = createSelector(
    [getUsersSelector],
    (items) => {
        return items.filter(u => true)
    }
)
export const getAuth = (state: AppStateType) => {
    return state.auth.isAuth
}
export const getUsersPageSize = (state: AppStateType) => {
    return state.usersPage.pageSize
}
export const getTotalUsersCount = (state: AppStateType) => {
    return state.usersPage.totalUsersCount
}
export const getCurrentPage = (state: AppStateType) => {
    return state.usersPage.currentPage
}
export const getIsFetching = (state: AppStateType) => {
    return state.usersPage.isFetching
}
export const getFollowingInProgress = (state: AppStateType) => {
    return state.usersPage.followingInProgress
}
export const getSearchUser = (state: AppStateType) => {
    return state.usersPage.searchUser
}

