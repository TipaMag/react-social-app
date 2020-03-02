export interface UsersInitial {
    users: UsersType
    pageSize: number
    totalUsersCount: number,
    currentPage: number,
    isFetching: boolean
    followingInProgress: any
}
export interface UsersType {
    items: Array<UserType>
    totalCount: number
    error: null | string
}
export interface UserType {
    name: string
    id: number
    uniqueUrlName: string | null
    photos: {
        small: string
        large: string
    }
    status: string
    followed: boolean
}