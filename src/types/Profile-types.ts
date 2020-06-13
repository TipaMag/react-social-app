export interface PostType {
    id: number
    message: string
    likesCount: number
}
export interface ProfileType {
    userId: number
    fullName: string
    aboutMe: string
    lookingForAJob: boolean
    lookingForAJobDescription: string | null
    contacts: ContactsType
    photos: PhotosType
}
export interface ContactsType {
    github: string
    vk: string
    facebook: string
    instagram: string
    twitter: string
    website: string
    youtube: string
    mainLink: string
}
export interface PhotosType {
    small: string
    large: string
}