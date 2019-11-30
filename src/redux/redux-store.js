import { createStore, combineReducers, applyMiddleware } from "redux"
import profileReducer from "./profile-reducer"
import dialogsReducer from "./dialogs-reducer"
import usersReducer from "./users-reducer"
import sidebarReducer from "./sidebar-reducer"
import authReducer from "./auth-reducer"
import thunkMiddleware from 'redux-thunk'
import { reducer as formReducer } from 'redux-form'

let reducers = combineReducers({
   profilePage: profileReducer,
   dialogsPage: dialogsReducer,
   usersPage: usersReducer,
   sidebar: sidebarReducer,
   auth: authReducer,
   
   form: formReducer
})

let store = createStore(reducers, applyMiddleware(thunkMiddleware)) // applyMiddleware - for dispatching thunk function 

window.store = store

export default store