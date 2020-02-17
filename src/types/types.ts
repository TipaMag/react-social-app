//profile-reducer >
export type PostType = {
    id: number
    message: string
    likesCount: number
 }
 export type ProfileType = {
    userId: number
    lookingForAJob: boolean
    lookingForAJobDescription: string | null
    fullName: string
    contacts: ContactsType
    photos: PhotosType
 }
 export type ContactsType = {
    github: string | null
    vk: string | null
    facebook: string | null
    instagram: string | null
    twitter: string | null
    website: string | null
    youtube: string | null
    mainLink: string | null
 }
 export type PhotosType = {
    small: string | null
    large: string | null
 }
 //users-reducer >
 export type UserType = {
    name: string
    id: number
    uniqueUrlName: string | null
    status: string | null
    followed: boolean
 }