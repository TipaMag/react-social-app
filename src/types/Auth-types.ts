export interface AuthInitial {
    userId: number | null,
    login: string | null,
    email: string | null,
    isAuth: boolean,
    smallPhoto: string | null,
    captchaUrl: string | null
}