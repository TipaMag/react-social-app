import { instance, ResponseType, GetItemsType } from "./api"
import { UserType } from "../types/Users-types"

export const usersAPI = {
    getUsers(friend: boolean, pageSize = 10, currentPage = 1, searchUser?: string) {
        let url = `users?friend=${friend}&count=${pageSize}&page=${currentPage}`
        if (searchUser) {
            url = `${url}&term=${searchUser}`
        }
        return instance.get<GetItemsType<UserType>>(url).then(res => res.data)
    },
    setFollow(userId: number) {
        return instance.post<ResponseType>(`follow/${userId}`).then(res => res.data)
    },
    setUnfollow(userId: number) {
        return instance.delete<ResponseType>(`follow/${userId}`).then(res => res.data)
    }
}