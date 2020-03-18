import React, { useState, useEffect } from 'react'
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
   
   useEffect(() => {
      setPortionNumber(1)
   }, [totalItemsCount])

   let leftPortionPageNumber = (portionNumber - 1) * portionSize + 1
   let rightPortionPageNumber = portionNumber * portionSize

   return (
      <PagginationContainer>
         <Button onClick={() => setPortionNumber(portionNumber - 1)} disabled={portionNumber <= 1}>{'<<'}</Button>
         {pages
            .filter(page => page >= leftPortionPageNumber && page <= rightPortionPageNumber)
            .map(page => (
               <PageNumber selectedPage={currentPage === page} key={page} onClick={() => onPageChanged(page)}>
                  {page}
               </PageNumber>
            ))
         }
         <Button onClick={() => setPortionNumber(portionNumber + 1)} disabled={portionCount <= portionNumber}>{'>>'}</Button>
      </PagginationContainer>
   )
}

export default Paggination