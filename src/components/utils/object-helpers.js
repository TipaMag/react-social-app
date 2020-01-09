export const updateObjectInArray = (items, objPropName, itemId, newObjProps) => { // for users-reducer
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