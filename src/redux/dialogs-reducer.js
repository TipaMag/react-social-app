import { dialogsAPI } from "../api/api"
import { reset } from 'redux-form'

const SET_DIALOGS = 'dialogs/SET_DIALOGS'
const SET_MESSAGES = 'dialogs/SET_MESSAGES'
const SET_MESSAGE = 'dialogs/SET-MESSAGE'
const SET_NEW_MESSAGES_COUNT = 'dialogs/SET-MESSAGES-COUNT'


let initialState = {
   dialogsData: [],
   messagesData: [],
   newMessagesCount: ''
}

const dialogsReducer = (state = initialState, action) => {
   switch (action.type) {
      case SET_DIALOGS:
         return {
            ...state,
            dialogsData: action.dialogs
         }
      case SET_MESSAGES:
         return {
            ...state,
            messagesData: action.messages
         }
      case SET_MESSAGE:
         return {
            ...state,
            messagesData: {...state.messagesData, ...state.messagesData.items.push(action.newMessage)}
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

export const setDialogs = (dialogs) => ({
   type: SET_DIALOGS,
   dialogs
})
export const setMessages = (messages) => ({
   type: SET_MESSAGES,
   messages
})
export const setMessage = (newMessage) => ({
   type: SET_MESSAGE,
   newMessage
})
export const setNewMessagesCount = (messagesCount) => ({
   type: SET_NEW_MESSAGES_COUNT,
   messagesCount
})

export const getDialogs = () => async (dispatch) => {
   let response = await dialogsAPI.getDialogs()
   if(response.data) {
      dispatch(setDialogs(response.data))
   }
}
export const getMessages = (userId) => async (dispatch) => {
   let response = await dialogsAPI.getMessages(userId)
   dispatch(setMessages(response.data))
}
export const startChatting = (userId) => async (dispatch) => {
   let response = await dialogsAPI.startChatting(userId)
   if(response.data.resultCode === 0) {
      getDialogs()
   }
}
export const sendMessage = (userId, messageBody) => async (dispatch) => {
   let response = await dialogsAPI.sendMessage(userId, messageBody)
   if(response.data.resultCode === 0) {
      dispatch(setMessage(response.data.data.message))
      dispatch(reset('dialogsAddMessageForm'))
   }
}

export default dialogsReducer