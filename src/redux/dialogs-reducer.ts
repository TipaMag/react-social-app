import { dialogsAPI, ResultCodesEnum } from "../api/api"
import { reset } from "redux-form"
import {
  DialogsInitial,
  DialogType,
  MessagesDataType,
  MessageType
} from "../types/Dialogs-types"
import {
  DialogsActionTypes,
  AppActionTypes,
  SET_DIALOGS,
  SET_MESSAGES,
  CLEAR_MESSAGES,
  SET_MESSAGE,
  SET_NEW_MESSAGES_COUNT,
  DELETE_MESSAGE
} from "../types/actions"
import { ThunkAction } from "redux-thunk"
import { AppStateType } from "./redux-store"

const initialState: DialogsInitial = {
  dialogsData: [],
  messagesData: {
    items: [],
    totalCount: 0,
    error: null
  },
  newMessagesCount: 0
}

const dialogsReducer = (
  state = initialState,
  action: DialogsActionTypes
): DialogsInitial => {
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
    case CLEAR_MESSAGES:
      return {
        ...state,
        messagesData: {
          items: [],
          totalCount: 0,
          error: null
        }
      }
    case SET_MESSAGE:
      return {
        ...state,
        messagesData: {
          ...state.messagesData,
          items: [...state.messagesData.items, action.newMessage],
          totalCount: state.messagesData.totalCount + 1
        }
      }
    case DELETE_MESSAGE:
      return {
        ...state,
        messagesData: {
          ...state.messagesData,
          items: [...state.messagesData.items.filter(item => item.id !== action.messageId)],
          totalCount: state.messagesData.totalCount - 1
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

export const setDialogs = (dialogs: Array<DialogType>): AppActionTypes => ({
  type: SET_DIALOGS,
  dialogs
})
export const setMessages = (messages: MessagesDataType): AppActionTypes => ({
  type: SET_MESSAGES,
  messages
})
export const clearMessages = (): AppActionTypes => ({
  type: CLEAR_MESSAGES
})
export const setMessage = (newMessage: MessageType): AppActionTypes => ({
  type: SET_MESSAGE,
  newMessage
})
export const deleteMessage = (messageId: string): AppActionTypes => ({
  type: DELETE_MESSAGE,
  messageId
})
export const setNewMessagesCount = (messagesCount: number): AppActionTypes => ({
  type: SET_NEW_MESSAGES_COUNT,
  messagesCount
})

type ThunkType = ThunkAction<void, AppStateType, unknown, AppActionTypes>
export const getDialogs = (): ThunkType => async dispatch => {
  let response = await dialogsAPI.getDialogs()
  if (response.data) {
    dispatch(setDialogs(response.data))
  }
}
export const getMessages = (userId: number): ThunkType => async dispatch => {
  let response = await dialogsAPI.getMessages(userId)
  dispatch(setMessages(response.data))
}
export const startChatting = (userId: number): ThunkType => async dispatch => {
  let response = await dialogsAPI.startChatting(userId)
  if (response.resultCode === ResultCodesEnum.Success) {
    dispatch(getDialogs())
  }
}
export const sendMessage = (
  userId: number,
  messageBody: string
): ThunkType => async dispatch => {
  let response = await dialogsAPI.sendMessage(userId, messageBody)
  if (response.resultCode === ResultCodesEnum.Success) {
    dispatch(setMessage(response.data.message))
    dispatch(reset("dialogsAddMessageForm"))
  }
}
export const removeMessage = (
  messageId: string
): ThunkType => async dispatch => {
  let response = await dialogsAPI.removeMessage(messageId)
  if (response.resultCode === ResultCodesEnum.Success) {
    dispatch(deleteMessage(messageId))
  }
}

export const getNewMessagesCount = (): ThunkType => async dispatch => {
  let response = await dialogsAPI.getNewMessagesCount()
  dispatch(setNewMessagesCount(response.data))
}

export default dialogsReducer
