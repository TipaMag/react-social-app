import axios from "axios"
import { UsersType } from "../types/Users-types"
import { ProfileType } from "../types/Profile-types"
import { DialogType, MessagesDataType, MessageType } from "../types/Dialogs-types"

const instance = axios.create({
    baseURL: 'https://social-network.samuraijs.com/api/1.0/',
    withCredentials: true,
    headers: {
        'API-KEY': '6c3d1700-155c-4611-a8e7-cad02c878cc6'
    }
})
export enum ResultCodesEnum {
    Success = 0,
    Error = 1
}
export enum ResultCodeForCaptcha {
    CaptchaIsRequired = 10
}
type GetAuthResponse = {
    data: {
        id: number
        email: string
        login: string
    }
    resultCode: ResultCodesEnum
    messages: Array<string>
}
type LoginResponse = {
    data: {
        userId: number
    }
    resultCode: ResultCodesEnum | ResultCodeForCaptcha
    messages: Array<string>
}
type LogoutResponse = {
    resultCode: ResultCodesEnum
}

export const authAPI = { //use headerContainer and login-page
    getAuth() {
        return instance.get<GetAuthResponse>('auth/me').then(res => res.data)
    },
    login(email: string, password: string, rememberMe = false, captcha: string | null = null) {
        return instance.post<LoginResponse>(`auth/login`, { email, password, rememberMe, captcha }).then(res => res.data)
    },
    logout() {
        return instance.delete<LogoutResponse>(`auth/login`).then(res => res.data)
    }
}
type GetCaptchaUrlResponse = {
    url: string
}
export const securityAPI = {
    getCaptchaUrl() {
        return instance.get<GetCaptchaUrlResponse>('security/get-captcha-url').then(res => res.data)
    }
}

type GetUsersResponse = UsersType
type SetFollowUnfollowResponse = {
    data: {}
    messages: Array<string>
    resultCode: ResultCodesEnum
}
export const usersAPI = {
    getUsers(pageSize: number, currentPage: number, term: string) {
        return instance.get<GetUsersResponse>(`users?count=${pageSize}&page=${currentPage}&term=${term}`)
    },
    setFollow(userId: number) {
        return instance.post<SetFollowUnfollowResponse>(`follow/${userId}`).then(res => res.data)
    },
    setUnfollow(userId: number) {
        return instance.delete<SetFollowUnfollowResponse>(`follow/${userId}`).then(res => res.data)
    }
}
type GetProfileResponse = ProfileType
type UpdateProfileStatusResponse = {
    data: {}
    messages: Array<string>
    resultCode: ResultCodesEnum
}
type SetProfilePhotoResponse = {
    data: {
        photos: {
            small: string
            large: string
        }
    }
    messages: Array<string>
    resultCode: ResultCodesEnum
}
type SaveProfileInfoResponse = {
    data: {}
    messages: Array<string>
    resultCode: ResultCodesEnum
}
export const profileAPI = {
    getProfile(userId: number | null) {
        return instance.get<GetProfileResponse>(`profile/${userId}`)
    },
    getProfileStatus(userId: number) {
        return instance.get<string>(`profile/status/${userId}`)
    },
    updateProfileStatus(status: string) {
        return instance.put<UpdateProfileStatusResponse>(`profile/status`, { status }).then(res => res.data)
    },
    setProfilePhoto(formData: FormData) {
        return instance.put<SetProfilePhotoResponse>(`profile/photo`, formData, { headers: { 'content-type': 'multipart/form-data' } }).then(res => res.data)
    },
    saveProfileInfo(formData: any) {
        return instance.put<SaveProfileInfoResponse>(`profile`, formData).then(res => res.data)
    }
}
type GetDialogsResponse = Array<DialogType>
type GetMessagesResponse = MessagesDataType
type StartChattingResponse = {
    data: {}
    messages: Array<string>
    resultCode: ResultCodesEnum
}
type SendMessageResponse = {
    data: {
        message: MessageType // тут не совсем правильный тип... в мессаге приходит больше данных
    }
    messages: Array<string>
    resultCode: ResultCodesEnum
}
export const dialogsAPI = {
    getDialogs() {
        return instance.get<GetDialogsResponse>('dialogs')
    },
    getMessages(userId: number) {
        return instance.get<GetMessagesResponse>(`dialogs/${userId}/messages`)
    },
    startChatting(userId: number) {
        return instance.put<StartChattingResponse>(`dialogs/${userId}`).then(res => res.data)
    },
    sendMessage(userId: number, message: string) {
        return instance.post<SendMessageResponse>(`dialogs/${userId}/messages`, { body: message }).then(res => res.data)
    },
    removeMessage(messageId: string) {
        return instance.delete(`dialogs/messages/${messageId}`).then(res => res.data)
    },
    getNewMessagesCount() {
        return instance.get<number>('dialogs/messages/new/count')
    }
}
