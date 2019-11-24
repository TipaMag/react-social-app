import * as Axios from "axios";


const usersInstance = Axios.create({
    baseURL: 'https://social-network.samuraijs.com/api/1.0/',
    withCredentials: true,
    headers: {
        'API-KEY': '110ca0ce-7842-47d7-bb4e-00537c1699ee'
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
        return usersInstance.post(`follow/${userId}`)
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