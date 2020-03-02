import defaultImg from './../../src/assets/images/default-user-image.png'
import { AppActionTypes } from '../types/actions'

interface InitialStateType {
   friends: Friends[]
   newMessagesCount: string | number
}
export interface Friends {
   id: number
   name: string
   avatar: any
}
let initialState: InitialStateType = {
   friends: [
      { id: 1, name: 'Andrey', avatar: defaultImg },
      { id: 2, name: 'Sanya', avatar: defaultImg },
      { id: 3, name: 'Anya', avatar: defaultImg },
      { id: 4, name: 'Gena', avatar: defaultImg },
      { id: 5, name: 'Marina', avatar: defaultImg }
   ],
   newMessagesCount: ''
}

const sidebarReducer = (state = initialState, action: AppActionTypes): InitialStateType => {
   switch (action.type) {
      default:
         return state
   }
}

export default sidebarReducer