import { instance, ResponseType, GetItemsType } from "./api"
import { UserType } from "../types/Users-types"

export const usersAPI = {
    getUsers(friend: boolean, pageSize = 10, currentPage = 1, searchUser?: string) {
        return instance.get<GetItemsType<UserType>>(`users?friend=${friend}&count=${pageSize}&page=${currentPage}&term=${searchUser}`).then(res => res.data)
    },
    setFollow(userId: number) {
        return instance.post<ResponseType>(`follow/${userId}`).then(res => res.data)
    },
    setUnfollow(userId: number) {
        return instance.delete<ResponseType>(`follow/${userId}`).then(res => res.data)
    }
}