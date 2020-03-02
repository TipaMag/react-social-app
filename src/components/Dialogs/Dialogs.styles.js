import styled from 'styled-components'

export const DialogsContainer = styled.div`
   display: grid;
   grid-template-columns: 2fr 8fr;
   grid-gap: 5px;
   height: 100%;
`
export const DialogsList = styled.ul`
   list-style: none;
   margin: 0;
   padding: 0;
   border: 1px solid black;
   max-height: 450px;
   overflow: auto;
   min-width: 250px;
`
export const Messages = styled.div`
   display: grid;
   grid-template-rows: 6fr 1fr;
   grid-gap: 5px;
   padding: 5px;
   border: 1px solid black;
`
export const MessagesList = styled.ul`
   display: flex;
   flex-flow: column;
   justify-content: flex-end;
   list-style: none;
   margin: 0;
   padding: 0px;
`