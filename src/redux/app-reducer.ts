import { getAuthUserData } from "./auth-reducer"
import { BaseThunkType, InferActionsTypes } from "./redux-store"

let initialState = {
   initialized: false
}
type InitialStateType = typeof initialState

const mainReducer = (state = initialState, action: AppActionsTypes): InitialStateType => {
   switch (action.type) {
      case 'INITIALIZED_SUCCESS':
         return {
            initialized: true,
         }
      default:
         return state
   }
}

export const appActions = {
   initializedSuccess: () => ({
      type: 'INITIALIZED_SUCCESS'
   } as const)
}

export type AppActionsTypes = InferActionsTypes<typeof appActions>
type ThunkType = BaseThunkType<AppActionsTypes>

export const initializeApp = (): ThunkType => (dispatch) => {
   let promise: any = dispatch(getAuthUserData())
   promise.then(() => {
         dispatch(appActions.initializedSuccess())
      })
}

export default mainReducer