import { GetItemsType } from "../api/api"
import { UserType } from "../types/Users-types"
import { InferActionsTypes, BaseThunkType } from "./redux-store"
import { usersAPI } from "../api/users-api"

let initialState = {
   friends: {} as GetItemsType<UserType>,
}
type InitialStateType = typeof initialState

const sidebarReducer = (state = initialState, action: SidebarActionsTypes): InitialStateType => {
   switch (action.type) {
      case 'SET_SIDEBAR_FRIENDS':
         return {
            ...state,
            friends: action.friends
         }
      default:
         return state
   }
}

export const sidebarActions = {
   setFriends: (friends: GetItemsType<UserType>) => ({
      type: 'SET_SIDEBAR_FRIENDS',
      friends
   } as const)
}

type SidebarActionsTypes = InferActionsTypes<typeof sidebarActions>
type ThunkType = BaseThunkType<SidebarActionsTypes>

export const getSidebarFriends = (): ThunkType => async (dispatch) => {
   let response = await usersAPI.getUsers(true, 6, 1, '')
   dispatch(sidebarActions.setFriends(response))
}


export default sidebarReducer