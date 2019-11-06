const ADD_MESSAGE = 'ADD-MESSAGE'
const UPDATE_NEW_MESSAGE_TEXT = 'UPDATE-NEW-MESSAGE-TEXT'

let initialState = {
   dialogsData: [
      { id: 1, name: 'Andrey', avatar: 'https://image.flaticon.com/icons/svg/145/145859.svg' },
      { id: 2, name: 'Sanya', avatar: 'https://image.flaticon.com/icons/svg/145/145859.svg' },
      { id: 3, name: 'Anya', avatar: 'https://image.flaticon.com/icons/svg/145/145862.svg' },
      { id: 4, name: 'Gena', avatar: 'https://image.flaticon.com/icons/svg/145/145859.svg' },
      { id: 5, name: 'Marina', avatar: 'https://image.flaticon.com/icons/svg/145/145862.svg' }
   ],
   messagesData: [
      { id: 1, message: 'Hello' },
      { id: 2, message: 'hi' },
      { id: 3, message: 'How are you' },
      { id: 4, message: 'Fine... and you?' },
      { id: 5, message: 'Nice... thanks' }
   ],
   newMessageText: ''
}

const dialogsReducer = (state = initialState, action) => {
   switch (action.type) {
      case UPDATE_NEW_MESSAGE_TEXT:
         return {
            ...state,
            newMessageText: action.newText
         }
      case ADD_MESSAGE:
         let newMessage = {
            id: 6,
            message: state.newMessageText
         }
         return {
            ...state,
            messagesData: [...state.messagesData, newMessage],
            newMessageText: ''
         }
      default:
         return state
   }
}

export const addMessageActionCreator = () => ({
   type: ADD_MESSAGE
})
export const updateNewMessageTextActionCreator = (text) => ({
   type: UPDATE_NEW_MESSAGE_TEXT,
   newText: text
})


export default dialogsReducer