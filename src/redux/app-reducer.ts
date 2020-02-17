import { getAuthUserData } from "./auth-reducer"

const INITIALIZED_SUCCESS = 'INITIALIZED-SUCCESS'



let initialState = {
   initialized: false as boolean
}
type InitialStateType = typeof initialState
const appReducer = (state = initialState, action: any): InitialStateType => {
   switch (action.type) {
      case INITIALIZED_SUCCESS:
         return {
            initialized: true,
         }
         default:
            return state
   }
}


type InitializedSuccessActionType = {
   type: typeof INITIALIZED_SUCCESS
}
export const initializedSuccess = (): InitializedSuccessActionType => ({
   type: INITIALIZED_SUCCESS
})

export const initializeApp = () => (dispatch: any) => {
   let promise = dispatch(getAuthUserData())
   promise.then(() =>{
         dispatch(initializedSuccess())
      })
}

export default appReducer