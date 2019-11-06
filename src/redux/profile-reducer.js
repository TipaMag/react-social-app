const ADD_POST = 'ADD-POST'
const UPDATE_NEW_POST_TEXT = 'UPDATE-NEW-POST-TEXT'

let initialState = {
   postsData: [
      { id: 1, message: 'Hello World', likesCount: 12 },
      { id: 2, message: 'olololol', likesCount: 3 },
      { id: 3, message: 'lolololol 111111', likesCount: 11 },
      { id: 4, message: 'Hello World', likesCount: 33 },
      { id: 5, message: 'Hello World', likesCount: 23 }
   ],
   newPostText: ''
}

const profileReducer = (state = initialState, action) => {
   switch (action.type) {
      case UPDATE_NEW_POST_TEXT:
         return {
            ...state,
            newPostText: action.newText
         }
      case ADD_POST:
         let newPost = {
            id: 6, message:
               state.newPostText,
            likesCount: 0
         }
         return {
            ...state,
            postsData: [newPost, ...state.postsData],
            newPostText: ''
         }
      default:
         return state
   }
}

export const addPostActionCreator = () => ({
   type: ADD_POST
})
export const updateNewPostTextActionCreator = (text) => ({
   type: UPDATE_NEW_POST_TEXT,
   newText: text
})


export default profileReducer