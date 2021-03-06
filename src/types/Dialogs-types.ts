export interface DialogType {
    id: number
    userName: string
    hasNewMessages: boolean
    lastDialogActivityDate: string
    lastUserActivityDate: string
    newMessagesCount: number
    photos: PhotosType
 }
 export interface PhotosType {
   small: string
   large: string
}
 export interface MessagesDataType {
    items: Array<MessageType>
    totalCount: number
    error: null | string
 }
 export interface MessageType {
    id: string
    body: string
    translatedBody: null | string
    addedAt: string
    senderId: number
    senderName: string
    recipientId: number
    recipientName: string
    deletedByRecipient: boolean
    deletedBySender: boolean
    distributionId: null | number
    isSpam: boolean
    viewed: boolean
 }