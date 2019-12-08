import React, { useState } from 'react'
import s from './Paggination.module.css'

const Paggination = (props) => {
   let { totalItemsCount, pageSize, currentPage, onPageChanged, portionSize = 10 } = props

   let pagesCount = Math.ceil(totalItemsCount / pageSize)
   let pages = []
   for (let i = 1; i <= pagesCount; i++) {
      pages.push(i)
   }

   let portionCount = Math.ceil(pagesCount / portionSize)
   let [portionNumber, setPortionNumber] = useState(1)
   let leftPortionPageNumber = (portionNumber - 1) * portionSize + 1
   let rightPortionPageNumber = portionNumber * portionSize

   let pagesList = pages
      .filter(page => page >= leftPortionPageNumber && page <= rightPortionPageNumber)
      .map(page => {
         return (
            <span className={currentPage === page ? s.selectedPage : ''} key={page}
               onClick={() => { onPageChanged(page) }}>{page}
            </span>
         )
      })

   return (
      <div className={s.pagination}>
         {
            // portionNumber > 1 &&
            <button onClick={() => { setPortionNumber(portionNumber - 1) }} disabled={portionNumber <= 1}>PREV</button>
         }
         {pagesList}
         {
            // portionCount > portionNumber &&
            <button onClick={() => { setPortionNumber(portionNumber + 1) }} disabled={portionCount <= portionNumber}>NEXT</button>
         }
      </div>
   )
}

export default Paggination