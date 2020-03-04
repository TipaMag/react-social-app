import styled from 'styled-components'

export const DialogsContainer = styled.div`
   display: grid;
   grid-template-columns: 2fr 8fr;
   grid-gap: 10px;
   height: 500px;
`

export const DialogsList = styled.div`
   width: 250px;
   position: relative;
   & ul {
      position: absolute;
      top: 0%;
      left: 0%;
      right: 0%;
      bottom: 0%;
      list-style: none;
      margin: 0;
      padding: 0;
      padding-right: 5px;
      overflow-y: auto;
      &::-webkit-scrollbar-track {
         box-shadow: inset 0 0 6px rgba(0,0,0,0.3);
         border-radius: 10px;
         background-color: #F5F5F5;
      }
      &::-webkit-scrollbar {
         width: 7px;
         background-color: #F5F5F5;
      }
      &::-webkit-scrollbar-thumb {
         border-radius: 10px;
         box-shadow: inset 0 0 6px rgba(0,0,0,.3);
         background-color: var(--DARK-BLUE);
      }
   }
`
export const Messages = styled.div`
   display: flex;
   flex-flow: column;
`
export const MessagesList = styled.div`
   height: 100%;
   position: relative;
   margin-bottom: 10px;
   & ul {
      position: absolute;
      top: 0%;
      left: 0%;
      right: 0%;
      bottom: 0%;
      list-style: none;
      margin: 0;
      padding: 0px;
      padding-right: 5px;
      overflow-y: auto;
      &::-webkit-scrollbar-track {
         box-shadow: inset 0 0 6px rgba(0,0,0,0.3);
         border-radius: 10px;
         background-color: #F5F5F5;
      }
      &::-webkit-scrollbar {
         width: 7px;
         background-color: #F5F5F5;
      }
      &::-webkit-scrollbar-thumb {
         border-radius: 10px;
         box-shadow: inset 0 0 6px rgba(0,0,0,.3);
         background-color: var(--DARK-BLUE);
      }
   }
`