const SEND_MESSAGE = 'SEND-MESSAGE'

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
   ]
}

const dialogsReducer = (state = initialState, action) => {
   switch (action.type) {
      case SEND_MESSAGE:
         let newMessage = {
            message: action.newMessageBody
         }
         return {
            ...state,
            messagesData: [...state.messagesData, newMessage],
         }
      default:
         return state
   }
}

export const sendMessage = (newMessageBody) => ({
   type: SEND_MESSAGE,
   newMessageBody
})


export default dialogsReducer