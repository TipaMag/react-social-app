export interface ProfileInitial {
    postsData: Array<PostType>
    autorizedProfile: ProfileType | null
    autorizedProfileStatus: string
    profile: ProfileType | null
    profileStatus: string
}

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
    github: string | null
    vk: string | null
    facebook: string | null
    instagram: string | null
    twitter: string | null
    website: string | null
    youtube: string | null
    mainLink: string | null
}
export interface PhotosType {
    small: string
    large: string
}