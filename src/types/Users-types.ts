export interface UserType {
    name: string
    id: number
    uniqueUrlName: string | null
    photos: {
        small: string
        large: string
    }
    status: string
    followed: boolean
}