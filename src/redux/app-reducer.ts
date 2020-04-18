import { getAuthUserData } from "./auth-reducer"
import { ThunkAction } from "redux-thunk"
import { AppStateType, InferActionsTypes } from "./redux-store"
// import { AppActionTypes, INITIALIZED_SUCCESS, InitializedSuccessActionType, AuthActionTypes } from "../types/actions"

let initialState = {
   initialized: false as boolean
}
type InitialStateType = typeof initialState
const appReducer = (state = initialState, action: AppActionsTypes): InitialStateType => {
   switch (action.type) {
      case 'INITIALIZED_SUCCESS':
         return {
            initialized: true,
         }
         default:
            return state
   }
}

export type AppActionsTypes = InferActionsTypes<typeof appActions>

export const appActions = {
   initializedSuccess: () => ({
      type: 'INITIALIZED_SUCCESS'
   } as const)
}

type ThunkType = ThunkAction<void, AppStateType, {}, AppActionsTypes>
export const initializeApp = (): ThunkType => (dispatch) => {
   let promise: any = dispatch(getAuthUserData())
   promise.then(() =>{
         dispatch(appActions.initializedSuccess())
      })
}

export default appReducer