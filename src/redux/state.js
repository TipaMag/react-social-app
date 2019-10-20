import { rerenderEntireTree } from "../render";

let state = {
   profilePage: {
      postsData: [
         { id: 1, message: 'Hello World', likesCount: 12 },
         { id: 2, message: 'olololol', likesCount: 3 },
         { id: 3, message: 'lolololol 111111', likesCount: 11 },
         { id: 4, message: 'Hello World', likesCount: 33 },
         { id: 5, message: 'Hello World', likesCount: 23 }
      ]
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
      ]
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
}

export let addPost = (postMessage) => {
   let newPost = { id: 6, message: postMessage, likesCount: 0 };
   state.profilePage.postsData.unshift(newPost);
   rerenderEntireTree(state, addPost);
}

export default state;