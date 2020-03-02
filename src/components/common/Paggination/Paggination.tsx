import React, { useState } from 'react'
import { PagginationContainer, PageNumber } from './Paggination.styles'
import Button from '../../../elements/Button'

interface Props {
   totalItemsCount: number
   pageSize: number
   currentPage: number
   onPageChanged: (page: number) => void
   portionSize?: number
}
const Paggination: React.FC<Props> = ({ totalItemsCount, pageSize, currentPage, onPageChanged, portionSize = 10 }) => {
   let pagesCount = Math.ceil(totalItemsCount / pageSize)
   let pages: number[] = []

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
            <PageNumber selectedPage={currentPage === page} key={page} onClick={() => onPageChanged(page)}>
               {page}
            </PageNumber>
         )
      })
   return (
      <PagginationContainer>
         <Button onClick={() => setPortionNumber(portionNumber - 1)} disabled={portionNumber <= 1}>PREV</Button>
         {pagesList}
         <Button onClick={() => setPortionNumber(portionNumber + 1)} disabled={portionCount <= portionNumber}>NEXT</Button>
      </PagginationContainer>
   )
}

export default Paggination