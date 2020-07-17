import { createStore, combineReducers, applyMiddleware, compose } from "redux"
import thunk, { ThunkMiddleware } from 'redux-thunk'
import { reducer as formReducer } from 'redux-form'

import mainReducer from "./app-reducer"
import profileReducer from "./profile-reducer"
import dialogsReducer from "./dialogs-reducer"
import usersReducer from "./users-reducer"
import sidebarReducer from "./sidebar-reducer"
import authReducer from "./auth-reducer"


const appReducer = combineReducers({
   app: mainReducer,

   profilePage: profileReducer,
   dialogsPage: dialogsReducer,
   usersPage: usersReducer,
   sidebar: sidebarReducer,
   auth: authReducer,
   
   form: formReducer
})

export type AppStateType = ReturnType<typeof appReducer>
export type InferActionsTypes<T> = T extends {[key: string]: (...args: any[]) => infer U} ? U : never

const rootReducer = (state: any, action: any) => { // решить вопрос с типизацией
   if(action.type === 'RESET') {
      state = undefined
   }
   return appReducer(state, action)
}




// @ts-ignore
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(rootReducer, composeEnhancers(applyMiddleware(thunk as ThunkMiddleware)))

// const store = createStore(reducers, applyMiddleware(thunk as ThunkMiddleware<AppState, AppActions>)) // applyMiddleware - for dispatching thunk function 

// @ts-ignore
// window.__store__ = store

export default store