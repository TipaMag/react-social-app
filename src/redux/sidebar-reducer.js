import { dialogsAPI } from "../api/api"

const SET_MESSAGES_COUNT = 'sidebar/SET-MESSAGES-COUNT'

let initialState = {
   friends: [
      { id: 1, name: 'Andrey', avatar: 'https://image.flaticon.com/icons/svg/145/145859.svg' },
      { id: 2, name: 'Sanya', avatar: 'https://image.flaticon.com/icons/svg/145/145859.svg' },
      { id: 3, name: 'Anya', avatar: 'https://image.flaticon.com/icons/svg/145/145862.svg' },
      { id: 4, name: 'Gena', avatar: 'https://image.flaticon.com/icons/svg/145/145859.svg' },
      { id: 5, name: 'Marina', avatar: 'https://image.flaticon.com/icons/svg/145/145862.svg' }
   ],
   newMessagesCount: ''
}

const sidebarReducer = (state = initialState, action) => {
   switch (action.type) {
      case SET_MESSAGES_COUNT:
         return {
            ...state,
            newMessagesCount: action.messagesCount
         }
      default:
         return state
   }
}

export const setMessagesCount = (messagesCount) => ({
   type: SET_MESSAGES_COUNT,
   messagesCount
})

export const getNewMessagesCount = () => async (dispatch) => {
   let response = await dialogsAPI.getNewMessagesCount()
   dispatch(setMessagesCount(response.data))
}

export default sidebarReducer