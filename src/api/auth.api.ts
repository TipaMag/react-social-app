import { instance, ResponseType, ResultCodesEnum, ResultCodeForCaptchaEnum } from './api'

type GetResponseData = {
    id: number
    email: string
    login: string
}
type LoginResponseData = {
    userId: number
}

export const authAPI = { //use header and login-page
    getAuth() {
        return instance.get<ResponseType<GetResponseData>>('auth/me').then(res => res.data)
    },
    login(email: string, password: string, rememberMe = false, captcha: string | null = null) {
        return instance.post<ResponseType<LoginResponseData, ResultCodesEnum | ResultCodeForCaptchaEnum>>(`auth/login`, { email, password, rememberMe, captcha }).then(res => res.data)
    },
    logout() {
        return instance.delete(`auth/login`).then(res => res.data)
    }
}