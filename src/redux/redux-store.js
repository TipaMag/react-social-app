import { createStore, combineReducers, applyMiddleware, compose } from "redux"
import appReducer from "./app-reducer"

import profileReducer from "./profile-reducer"
import dialogsReducer from "./dialogs-reducer"
import usersReducer from "./users-reducer"
import sidebarReducer from "./sidebar-reducer"
import authReducer from "./auth-reducer"
import thunkMiddleware from 'redux-thunk'
import { reducer as formReducer } from 'redux-form'

let reducers = combineReducers({
   app: appReducer,

   profilePage: profileReducer,
   dialogsPage: dialogsReducer,
   usersPage: usersReducer,
   sidebar: sidebarReducer,
   auth: authReducer,
   
   form: formReducer
})


const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(reducers, composeEnhancers(applyMiddleware(thunkMiddleware)))

// let store = createStore(reducers, applyMiddleware(thunkMiddleware)) // applyMiddleware - for dispatching thunk function 

window.__store__ = store

export default store