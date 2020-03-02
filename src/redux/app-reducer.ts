import { getAuthUserData } from "./auth-reducer"
import { ThunkAction } from "redux-thunk"
import { AppStateType } from "./redux-store"
import { AppActionTypes, INITIALIZED_SUCCESS, InitializedSuccessActionType } from "../types/actions"


let initialState = {
   initialized: false as boolean
}
type InitialStateType = typeof initialState
const appReducer = (state = initialState, action: InitializedSuccessActionType): InitialStateType => {
   switch (action.type) {
      case INITIALIZED_SUCCESS:
         return {
            initialized: true,
         }
         default:
            return state
   }
}

export const initializedSuccess = (): InitializedSuccessActionType => ({
   type: INITIALIZED_SUCCESS
})

type ThunkType = ThunkAction<void, AppStateType, unknown, AppActionTypes>
export const initializeApp = (): ThunkType => (dispatch) => {
   let promise: any = dispatch(getAuthUserData())
   promise.then(() =>{
         dispatch(initializedSuccess())
      })
}

export default appReducer