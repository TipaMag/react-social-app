import { dialogsAPI } from "../api/api"
import { reset } from 'redux-form'

const SET_DIALOGS = 'dialogs/SET_DIALOGS'
const SET_MESSAGES = 'dialogs/SET_MESSAGES'
const SET_MESSAGE = 'dialogs/SET-MESSAGE'
const SET_NEW_MESSAGES_COUNT = 'dialogs/SET-MESSAGES-COUNT'

// let initialState = {
//    dialogsData: [
//       { id: 1, name: 'Andrey', avatar: 'https://image.flaticon.com/icons/svg/145/145859.svg' },
//       { id: 2, name: 'Sanya', avatar: 'https://image.flaticon.com/icons/svg/145/145859.svg' },
//       { id: 3, name: 'Anya', avatar: 'https://image.flaticon.com/icons/svg/145/145862.svg' },
//       { id: 4, name: 'Gena', avatar: 'https://image.flaticon.com/icons/svg/145/145859.svg' },
//       { id: 5, name: 'Marina', avatar: 'https://image.flaticon.com/icons/svg/145/145862.svg' }
//    ],
//    messagesData: [
//       { id: 1, message: 'Hello' },
//       { id: 2, message: 'hi' },
//       { id: 3, message: 'How are you' },
//       { id: 4, message: 'Fine... and you?' },
//       { id: 5, message: 'Nice... thanks' }
//    ]
// }

let initialState1 = {
   dialogsData: [],
   messagesData: [],
   newMessagesCount: ''
}

const dialogsReducer = (state = initialState1, action) => {
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




// export const sendMessage = (id,message) => async (dispatch) => {
//    dispatch(reset('Message'));  // очистка текстерии
//    let response = await dialogsAPI.sendMessage(id,message);
//    if (response.data.resultCode === 0) {
//        dispatch(upDialogOnTop(id));  
// //подем диалога на верх ( по дефолтну диалоги по дате новых сообщений сортируются так что просто поднимаю в стейте чтобы повсторный запрос неделать)
//        dispatch(setNewMessageInState(response.data.data.message))  //с респонса добавляю сообщение в стейт
// он приходит с айди и всеми нужными данными
//    }
// };

// case SET_NEW_MESSAGE_IN_STATE:
//             return {
//                ...state, 
//                currentDialogsMessage: [...state.currentDialogsMessage,action.message]
//             };

export default dialogsReducer