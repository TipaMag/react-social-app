import * as Axios from "axios"

const instance = Axios.create({
    baseURL: 'https://social-network.samuraijs.com/api/1.0/',
    withCredentials: true,
    headers: {
        'API-KEY': 'c5956654-9a37-4486-b8b3-d65049a46b03'
    }
})

export const usersAPI = {
    getUsers(pageSize, currentPage) {
        return instance.get(`users?count=${pageSize}&page=${currentPage}`)
    },
    setFollow(userId) {
        return instance.post(`follow/${userId}`)
    },
    setUnfollow(userId) {
        return instance.delete(`follow/${userId}`)
    }
}
export const profileAPI = {
    getProfile(userId) {
        return instance.get(`profile/${userId}`)
    },
    getProfileStatus(userId) {
        return instance.get(`profile/status/${userId}`)
    },
    updateProfileStatus(userStatus) {
        return instance.put(`profile/status`, { status: userStatus })
    },
    setProfilePhoto(formData) {
        return instance.put(`profile/photo`, formData, {
            headers: { 'content-type': 'multipart/form-data' }
        })
    },
    saveProfileInfo(formData) {
        return instance.put(`profile`, formData)
    }
}
export const authAPI = { //use headerContainer and login-page
    getAuth() {
        return instance.get('auth/me')
    },
    login(email, password, rememberMe = false, captcha = null) {
        return instance.post(`auth/login`, { email, password, rememberMe, captcha })
    },
    logout() {
        return instance.delete(`auth/login`)
    }
}
export const securityAPI = {
    getCaptchaUrl() {
        return instance.get('security/get-captcha-url')
    }
}
export const dialogsAPI = {
    getDialogs() {
        return instance.get('dialogs')
    },
    getMessages(userId) {
        return instance.get(`dialogs/${userId}/messages`)
    },
    startChatting(userId) {
        return instance.put(`dialogs/${userId}`)
    },
    sendMessage(userId, message) {
        return instance.post(`dialogs/${userId}/messages`, { body: message})
    },
    getNewMessagesCount() {
        return instance.get('dialogs/messages/new/count')
    }
}