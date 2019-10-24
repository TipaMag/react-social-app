// let rerenderEntireTree = () => {
//    console.log('State changed')
// }
let store = {
   _subscriber() {
      console.log('no subscribers (observers)')
   },
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
   addPost() {
      let newPost = { id: 6, message: this._state.profilePage.newPostText, likesCount: 0 }
      this._state.profilePage.postsData.unshift(newPost)
      this._state.profilePage.newPostText = ''
      this._subscriber()
   },
   updateNewPostText(newText) {
      this._state.profilePage.newPostText = newText
      this._subscriber()
   },
   addMessage() {
      let newMessage = { id: 6, message: this._state.dialogsPage.newMessageText }
      this._state.dialogsPage.messagesData.push(newMessage)
      this._state.dialogsPage.newMessageText = ''
      this._subscriber()
   },
   updateNewMessageText(newText) {
      this._state.dialogsPage.newMessageText = newText;
      this._subscriber()
   },
   subscribe(observer) {
      this._subscriber = observer
   }
}


// let state = {
//    profilePage: {
//       postsData: [
//          { id: 1, message: 'Hello World', likesCount: 12 },
//          { id: 2, message: 'olololol', likesCount: 3 },
//          { id: 3, message: 'lolololol 111111', likesCount: 11 },
//          { id: 4, message: 'Hello World', likesCount: 33 },
//          { id: 5, message: 'Hello World', likesCount: 23 }
//       ],
//       newPostText: ''
//    },
//    dialogsPage: {
//       dialogsData: [
//          { id: 1, name: 'Andrey', avatar: 'https://image.flaticon.com/icons/svg/145/145859.svg' },
//          { id: 2, name: 'Sanya', avatar: 'https://image.flaticon.com/icons/svg/145/145859.svg' },
//          { id: 3, name: 'Anya', avatar: 'https://image.flaticon.com/icons/svg/145/145862.svg' },
//          { id: 4, name: 'Gena', avatar: 'https://image.flaticon.com/icons/svg/145/145859.svg' },
//          { id: 5, name: 'Marina', avatar: 'https://image.flaticon.com/icons/svg/145/145862.svg' }
//       ],
//       messagesData: [
//          { id: 1, message: 'Hello' },
//          { id: 2, message: 'hi' },
//          { id: 3, message: 'How are you' },
//          { id: 4, message: 'Fine... and you?' },
//          { id: 5, message: 'Nice... thanks' }
//       ],
//       newMessageText: ''
//    },
//    sidebar: {
//       friends: [
//          { id: 1, name: 'Andrey', avatar: 'https://image.flaticon.com/icons/svg/145/145859.svg' },
//          { id: 2, name: 'Sanya', avatar: 'https://image.flaticon.com/icons/svg/145/145859.svg' },
//          { id: 3, name: 'Anya', avatar: 'https://image.flaticon.com/icons/svg/145/145862.svg' },
//          { id: 4, name: 'Gena', avatar: 'https://image.flaticon.com/icons/svg/145/145859.svg' },
//          { id: 5, name: 'Marina', avatar: 'https://image.flaticon.com/icons/svg/145/145862.svg' }
//       ]
//    }
// }

// export const addPost = () => {
//    let newPost = {
//       id: 6,
//       message: state.profilePage.newPostText,
//       likesCount: 0
//    }
//    state.profilePage.postsData.unshift(newPost);
//    state.profilePage.newPostText = '';
//    rerenderEntireTree();
// }
// export const updateNewPostText = (newText) => {
//    state.profilePage.newPostText = newText;
//    rerenderEntireTree();
// }

// export const addMessage = () => {
//    let newMessage = {
//       id: 6,
//       message: state.dialogsPage.newMessageText
//    }
//    state.dialogsPage.messagesData.push(newMessage)
//    state.dialogsPage.newMessageText = ''
//    rerenderEntireTree();
// }
// export const updateNewMessageText = (newText) => {
//    state.dialogsPage.newMessageText = newText;
//    rerenderEntireTree();
// }

// export const subscribe = (observer) => {
//    rerenderEntireTree = observer
// }


// export default state;

export default store