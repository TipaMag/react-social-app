import { AppStateType } from "./redux-store"

export const getAutorizedProfile = ((state: AppStateType) => state.profilePage.autorizedProfile)
export const getAutorizedProfileStatus = ((state: AppStateType) => state.profilePage.autorizedProfileStatus)
export const getProfile = ((state: AppStateType) => state.profilePage.profile)
export const getProfileStatus = ((state: AppStateType) => state.profilePage.profileStatus)
export const getAutorizedUserId = ((state: AppStateType) => state.auth.userId)
export const getIsAuth = ((state: AppStateType) => state.auth.isAuth)