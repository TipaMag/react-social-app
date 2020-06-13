import { instance, ResponseType } from "./api"
import { ProfileType, PhotosType } from "../types/Profile-types"

type ResponsePhotosType = {
    photos: PhotosType
}

export const profileAPI = {
    getProfile(userId: number | null) {
        return instance.get<ProfileType>(`profile/${userId}`).then(res => res.data)
    },
    getProfileStatus(userId: number) {
        return instance.get<string>(`profile/status/${userId}`).then(res => res.data)
    },
    updateProfileStatus(status: string) {
        return instance.put<ResponseType>(`profile/status`, { status }).then(res => res.data)
    },
    setProfilePhoto(formData: FormData) {
        return instance.put<ResponseType<ResponsePhotosType>>(`profile/photo`, formData, { headers: { 'content-type': 'multipart/form-data' } }).then(res => res.data)
    },
    saveProfileInfo(formData: any) {
        return instance.put<ResponseType>(`profile`, formData).then(res => res.data)
    }
}