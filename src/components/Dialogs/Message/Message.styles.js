import styled from 'styled-components'

export const MessageItem = styled.li`
   padding: 20px 35px 5px 10px;
   margin: 7px 0 12px 0;
   position: relative;
   background-color: var(--WHITE);
   border-radius: 5px;
   transition: all 0.3s;
   border: 1px solid var(--WHITE);
   overflow: hidden;
   cursor: pointer;
   &:hover {
      border-color: var(--DARK-BLUE);
   }
   &:hover button {
      opacity: 1;
   }
`
export const SenderName = styled.span`
   font-size: 12px;
   position: absolute;
   top: 0;
   left: 25px;
   color: var(--DARK-BLUE);
`
export const SenderMessage = styled.span`
   font-style: italic;
   display: flex;
`
export const TrashBtn = styled.button`
   transition: all 0.3s;
   color: var(--DARK-BLUE);
   position: absolute;
   top: 50%;
   right: 10px;
   opacity: 0;
   transform: translateY(-50%);
   border: none;
   padding: 0;
   background: transparent;
   cursor: pointer;
   outline: none;
   &:hover {
      color: var(--RED);
   }
`