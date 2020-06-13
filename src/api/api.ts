import axios from "axios"

export const instance = axios.create({
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
export enum ResultCodeForCaptchaEnum {
    CaptchaIsRequired = 10
}

export type GetItemsType<D> = {
    items: Array<D>
    totalCount: number
    error: null | string
}

export type ResponseType<D = {}, RC = ResultCodesEnum> = {
    data: D
    messages: Array<string>
    resultCode: RC
}