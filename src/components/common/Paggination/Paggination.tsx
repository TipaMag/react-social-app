import React, { useState, useEffect } from 'react'
import styled from "styled-components"


const Container = styled.div `
   display: flex;
   flex-flow: row nowrap;
   padding: 5px 10px;
   justify-content: center;
`
const PageNumber = styled.div<{selectedPage: boolean}>`
   width: 25px;
   height: 25px;
   border-radius: 50%;
   line-height: 25px;
   text-align: center;
   font-size: 11px;
   margin: 0 3px;
   color: ${props => props.selectedPage ? 'var(--WHITE)' : "#000"};
   background-color: ${props => props.selectedPage ? 'var(--DARK-BLUE)' : "transparent"};
   cursor: pointer;

`
const Btn = styled.button`
   width: 25px;
   height: 25px;
   border-radius: 50%;
   line-height: 12px;
   color: ${props => props.disabled ? 'var(--DARK-GRAY)' : 'var(--DARK-BLUE)'};
   font-weight: bold;
   font-size: 14px;
   padding: 7px;
   border: none;
   cursor: pointer;
   outline: none;
   transition: 0.2s;
   &:hover {
      background-color: var(--LIGHT-BLUE);
   }
`

interface Props {
   totalItemsCount: number
   pageSize: number
   currentPage: number
   friend: boolean
   onPageChanged: (friend: boolean, page: number) => void
   portionSize?: number
}

const Paggination: React.FC<Props> = ({ totalItemsCount, pageSize, currentPage, friend, onPageChanged, portionSize = 10 }) => {

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
      <Container>
         <Btn onClick={() => setPortionNumber(portionNumber - 1)} disabled={portionNumber <= 1}>{'<'}</Btn>
         {pages
            .filter(page => page >= leftPortionPageNumber && page <= rightPortionPageNumber)
            .map(page => (
               <PageNumber selectedPage={currentPage === page} key={page} onClick={() => onPageChanged(friend, page)}>
                  {page}
               </PageNumber>
            ))
         }
         <Btn onClick={() => setPortionNumber(portionNumber + 1)} disabled={portionCount <= portionNumber}>{'>'}</Btn>
      </Container>
   )
}

export default Paggination