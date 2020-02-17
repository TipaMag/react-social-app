import defaultImg from './../../src/assets/images/default-user-image.png'

type Friends = {
   id: number
   name: string
   avatar: any
}
let initialState = {
   friends: [
      { id: 1, name: 'Andrey', avatar: defaultImg },
      { id: 2, name: 'Sanya', avatar: defaultImg },
      { id: 3, name: 'Anya', avatar: defaultImg },
      { id: 4, name: 'Gena', avatar: defaultImg },
      { id: 5, name: 'Marina', avatar: defaultImg }
   ] as Array<Friends>,
   newMessagesCount: ''
}
type InitialStateType = typeof initialState

const sidebarReducer = (state = initialState, action: any): InitialStateType => {
   switch (action.type) {
      default:
         return state
   }
}

export default sidebarReducer