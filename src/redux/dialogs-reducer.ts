import { dialogsAPI } from "../api/api"
import { reset } from 'redux-form'

const SET_DIALOGS = 'dialogs/SET_DIALOGS'
const SET_MESSAGES = 'dialogs/SET_MESSAGES'
const SET_MESSAGE = 'dialogs/SET-MESSAGE'
const SET_NEW_MESSAGES_COUNT = 'dialogs/SET-MESSAGES-COUNT'

type DialogType = {
   id: number
   userName: string
   hasNewMessages: boolean
   lastDialogActivityDate: string
   lastUserActivityDate: string
   newMessagesCount: number
}
type MessagesDataType = {
   items: Array<MessageType>,
   totalCount: number,
   error: null
}
type MessageType = {
   id: string
   body: string
   translatedBody: null | string
   addedAt: string
   senderId: number
   senderName: string
   recipientId: number
   viewed: boolean
}

let initialState = {
   dialogsData: [] as Array<DialogType>,
   messagesData: {
      items: [],
      totalCount: 0,
      error: null
   } as MessagesDataType,
   newMessagesCount: 0
}
type InitialStateType = typeof initialState

const dialogsReducer = (state: InitialStateType = initialState, action: any): InitialStateType => {
   switch (action.type) {
      case SET_DIALOGS:
         return {
            ...state,
            dialogsData: action.dialogs
         }
      case SET_MESSAGES:
         return {
            ...state,
            messagesData: { ...action.messages }
         }
      case SET_MESSAGE:
         return {
            ...state,
            messagesData: {
               ...state.messagesData,
               items:  [...state.messagesData.items, action.newMessage ],
               // ...state.messagesData.items.push(action.newMessage),
               totalCount: state.messagesData.totalCount + 1
            }
         }
      case SET_NEW_MESSAGES_COUNT:
         return {
            ...state,
            newMessagesCount: action.messagesCount
         }
      default:
         return state
   }
}

type SetDialogsActionType = {
   type: typeof SET_DIALOGS,
   dialogs: DialogType
}
export const setDialogs = (dialogs: DialogType): SetDialogsActionType => ({
   type: SET_DIALOGS,
   dialogs
})
type SetMessagesActionType = {
   type: typeof SET_MESSAGES,
   messages: MessagesDataType
}
export const setMessages = (messages: MessagesDataType): SetMessagesActionType => ({
   type: SET_MESSAGES,
   messages
})
type SetMessageActionType = {
   type: typeof SET_MESSAGE,
   newMessage: MessageType
}
export const setMessage = (newMessage: MessageType): SetMessageActionType => ({
   type: SET_MESSAGE,
   newMessage,
})
type SetNewMessagesCountActionType = {
   type: typeof SET_NEW_MESSAGES_COUNT,
   messagesCount: number
}
export const setNewMessagesCount = (messagesCount: number): SetNewMessagesCountActionType => ({
   type: SET_NEW_MESSAGES_COUNT,
   messagesCount
})

export const getDialogs = () => async (dispatch: any) => {
   let response = await dialogsAPI.getDialogs()
   if (response.data) {
      dispatch(setDialogs(response.data))
   }
}
export const getMessages = (userId: number) => async (dispatch: any) => {
   let response = await dialogsAPI.getMessages(userId)
   dispatch(setMessages(response.data))
}
export const startChatting = (userId: number) => async (dispatch: any) => {
   let response = await dialogsAPI.startChatting(userId)
   if (response.data.resultCode === 0) {
      getDialogs()
   }
}
export const sendMessage = (userId: number, messageBody: string) => async (dispatch: any) => {
   let response = await dialogsAPI.sendMessage(userId, messageBody)
   if (response.data.resultCode === 0) {
      dispatch(setMessage(response.data.data.message))
      dispatch(reset('dialogsAddMessageForm'))
   }
}

export default dialogsReducer