import { dialogsAPI, ResultCodesEnum } from "../api/api"
import { reset } from "redux-form"
import { DialogsInitial, DialogType, MessagesDataType, MessageType } from "../types/Dialogs-types"
// import { DialogsActionTypes, AppActionTypes, SET_DIALOGS, SET_MESSAGES, CLEAR_MESSAGES, SET_MESSAGE, SET_NEW_MESSAGES_COUNT, DELETE_MESSAGE
// } from "../types/actions"
import { ThunkAction } from "redux-thunk"
import { AppStateType, InferActionsTypes } from "./redux-store"

const initialState: DialogsInitial = {
  dialogsData: [],
  messagesData: {
    items: [],
    totalCount: 0,
    error: null
  },
  newMessagesCount: 0
}

const dialogsReducer = ( state = initialState, action: DialogsActionsTypes ): DialogsInitial => {
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
  if (response.data) {
    dispatch(dialogsActions.setDialogs(response.data))
  }
}
export const getMessages = (userId: number): ThunkType => async dispatch => {
  let response = await dialogsAPI.getMessages(userId)
  dispatch(dialogsActions.setMessages(response.data))
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
  dispatch(dialogsActions.setNewMessagesCount(response.data))
}
export const clearMessages = (): ThunkType => async dispatch => {
  dispatch(dialogsActions.clearMessages())
}

export default dialogsReducer
