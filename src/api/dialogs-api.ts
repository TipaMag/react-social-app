import { instance, ResultCodesEnum, ResponseType, GetItemsType } from "./api"
import { DialogType, MessageType } from "../types/Dialogs-types"


type SendMessageResponse = { // message в data лишний... но так приходит с апишки, ResponseType чутка не подошел
    data: {
        message: MessageType
    }
    messages: Array<string>
    resultCode: ResultCodesEnum
}
export const dialogsAPI = {
    getDialogs() {
        return instance.get<Array<DialogType>>('dialogs').then(res => res.data)
    },
    getMessages(userId: number) {
        return instance.get<GetItemsType<MessageType>>(`dialogs/${userId}/messages`).then(res => res.data)
    },
    startChatting(userId: number) {
        return instance.put<ResponseType>(`dialogs/${userId}`).then(res => res.data)
    },
    sendMessage(userId: number, message: string) {
        return instance.post<SendMessageResponse>(`dialogs/${userId}/messages`, { body: message }).then(res => res.data)
    },
    removeMessage(messageId: string) {
        return instance.delete(`dialogs/messages/${messageId}`).then(res => res.data)
    },
    getNewMessagesCount() {
        return instance.get<number>('dialogs/messages/new/count').then(res => res.data)
    }
}