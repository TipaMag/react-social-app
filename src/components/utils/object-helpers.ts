import { UserType } from './../../types/Users-types'


export const updateObjectInArray = (items: UserType[], objPropName: 'id', itemId: number, newObjProps: { followed: boolean }): UserType[] => { // for users-reducer

   return items.map(item => {
      if (item[objPropName] === itemId) {
         return {
            ...item,
            ...newObjProps
         }
      }
      return item
   })
}