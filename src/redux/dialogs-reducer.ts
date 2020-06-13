import { ResultCodesEnum } from "../api/api"
import { ThunkAction } from "redux-thunk"
import { reset } from "redux-form"
import { DialogType, MessagesDataType, MessageType } from "../types/Dialogs-types"

import { AppStateType, InferActionsTypes } from "./redux-store"
import { dialogsAPI } from "../api/dialogs-api"


const initialState = {
  dialogsData: [] as Array<DialogType>,
  messagesData: {
    items: [],
    totalCount: 0,
    error: ''
  } as MessagesDataType,
  newMessagesCount: 0
}

type InitialStateType = typeof initialState

const dialogsReducer = ( state = initialState, action: DialogsActionsTypes ): InitialStateType => {
  switch (action.type) {
    case 'SET_DIALOGS':
      return {
        ...state,
        dialogsData: action.dialogs
      }
    case 'SET_MESSAGES':
      return {
        ...state,
        messagesData: { ...action.messages }
      }
    case 'CLEAR_MESSAGES':
      return {
        ...state,
        messagesData: {
          items: [],
          totalCount: 0,
          error: null
        }
      }
    case 'SET_MESSAGE':
      return {
        ...state,
        messagesData: {
          ...state.messagesData,
          items: [...state.messagesData.items, action.newMessage],
          totalCount: state.messagesData.totalCount + 1
        }
      }
    case 'DELETE_MESSAGE':
      return {
        ...state,
        messagesData: {
          ...state.messagesData,
          items: [
            ...state.messagesData.items.filter(
              item => item.id !== action.messageId
            )
          ],
          totalCount: state.messagesData.totalCount - 1
        }
      }
    case 'SET_NEW_MESSAGES_COUNT':
      return {
        ...state,
        newMessagesCount: action.messagesCount
      }
    default:
      return state
  }
}

type DialogsActionsTypes = InferActionsTypes<typeof dialogsActions>

export const dialogsActions = {
  setDialogs: (dialogs: Array<DialogType>) => ({
    type: 'SET_DIALOGS',
    dialogs
  } as const),
  setMessages: (messages: MessagesDataType) => ({
    type: 'SET_MESSAGES',
    messages
  } as const),
  clearMessages: () => ({
    type: 'CLEAR_MESSAGES'
  } as const),
  setMessage: (newMessage: MessageType) => ({
    type: 'SET_MESSAGE',
    newMessage
  } as const),
  deleteMessage: (messageId: string) => ({
    type: 'DELETE_MESSAGE',
    messageId
  } as const),
  setNewMessagesCount: (messagesCount: number) => ({
    type: 'SET_NEW_MESSAGES_COUNT',
    messagesCount
  } as const)
}


type ThunkType = ThunkAction<void, AppStateType, {}, DialogsActionsTypes>

export const getDialogs = (): ThunkType => async dispatch => {
  let response = await dialogsAPI.getDialogs()
  dispatch(dialogsActions.setDialogs(response))
}
export const getMessages = (userId: number): ThunkType => async dispatch => {
  let response = await dialogsAPI.getMessages(userId)
  dispatch(dialogsActions.setMessages(response))
}
export const startChatting = (userId: number): ThunkType => async dispatch => {
  let response = await dialogsAPI.startChatting(userId)
  if (response.resultCode === ResultCodesEnum.Success) {
    dispatch(getDialogs())
  }
}
export const sendMessage = ( userId: number, messageBody: string ): ThunkType => async dispatch => {
  let response = await dialogsAPI.sendMessage(userId, messageBody)
  if (response.resultCode === ResultCodesEnum.Success) {
    dispatch(dialogsActions.setMessage(response.data.message))
    dispatch(reset("dialogsAddMessageForm"))
  }
}
export const removeMessage = ( messageId: string ): ThunkType => async dispatch => {
  let response = await dialogsAPI.removeMessage(messageId)
  if (response.resultCode === ResultCodesEnum.Success) {
    dispatch(dialogsActions.deleteMessage(messageId))
  }
}
export const getNewMessagesCount = (): ThunkType => async dispatch => {
  let response = await dialogsAPI.getNewMessagesCount()
  dispatch(dialogsActions.setNewMessagesCount(response))
}
export const clearMessages = (): ThunkType => dispatch => {
  dispatch(dialogsActions.clearMessages())
}

export default dialogsReducer
