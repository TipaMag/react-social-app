import * as Axios from "axios";


const usersInstance = Axios.create({
    baseURL: 'https://social-network.samuraijs.com/api/1.0/',
    withCredentials: true,
    headers: {
        'API-KEY': '39d2f235-01a5-4797-ab5f-5790c8df9b53'
    }
})
const profileInstance = Axios.create({
    baseURL: 'https://social-network.samuraijs.com/api/1.0/'
})
const authInstance = Axios.create({
    baseURL: 'https://social-network.samuraijs.com/api/1.0/',
    withCredentials: true
})

export const usersAPI = {
    getUsers(pageSize, currentPage) {
        return usersInstance.get(`users?count=${pageSize}&page=${currentPage}`)
            .then((response) => {
                return response.data
            })
    },
    setFollow(userId) {
        return usersInstance.post(`follow/${userId}`, {})
            .then((response) => {
                return response.data
            })
    },
    setUnfollow(userId) {
        return usersInstance.delete(`follow/${userId}`)
            .then((response) => {
                return response.data
            })
    }
}
export const profileAPI = {
    getProfile(userId) {
        return profileInstance.get(`profile/${userId}`)
            .then((response) => {
                return response.data
            })
    }
}
export const authAPI = { //use headerContainer
    getAuth() {
        return authInstance.get('auth/me')
        .then((response) => {
            return response.data
        })
    }
}