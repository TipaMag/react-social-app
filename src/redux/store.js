import profileReducer from "./profile-reducer"
import dialogsReducer from "./dialogs-reducer"
import sidebarReducer from "./sidebar-reducer"

let store = {
   _state: {
      profilePage: {
         postsData: [
            { id: 1, message: 'Hello World', likesCount: 12 },
            { id: 2, message: 'olololol', likesCount: 3 },
            { id: 3, message: 'lolololol 111111', likesCount: 11 },
            { id: 4, message: 'Hello World', likesCount: 33 },
            { id: 5, message: 'Hello World', likesCount: 23 }
         ],
         newPostText: ''
      },
      dialogsPage: {
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
      },
      sidebar: {
         friends: [
            { id: 1, name: 'Andrey', avatar: 'https://image.flaticon.com/icons/svg/145/145859.svg' },
            { id: 2, name: 'Sanya', avatar: 'https://image.flaticon.com/icons/svg/145/145859.svg' },
            { id: 3, name: 'Anya', avatar: 'https://image.flaticon.com/icons/svg/145/145862.svg' },
            { id: 4, name: 'Gena', avatar: 'https://image.flaticon.com/icons/svg/145/145859.svg' },
            { id: 5, name: 'Marina', avatar: 'https://image.flaticon.com/icons/svg/145/145862.svg' }
         ]
      }
   },
   getState() {
      return this._state
   },
   _subscriber() {
      console.log('no subscribers (observers)')
   },
   subscribe(observer) {
      this._subscriber = observer
   },
   dispatch(action) {
      this._state.profilePage = profileReducer(this._state.profilePage, action)
      this._state.dialogsPage = dialogsReducer(this._state.dialogsPage, action)
      this._state.sidebar = sidebarReducer(this._state.sidebar, action)

      this._subscriber()
   }
}

export default store