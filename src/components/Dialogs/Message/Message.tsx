import React from 'react'
import styled from 'styled-components'
import DateTime from '../../common/DateTime/DateTime'

const MessageItem = styled.li`
   padding: 17px 7px 4px;
   margin: 7px 0 12px 0;
   position: relative;
   background-color: var(--WHITE);
   border-radius: 5px;
`
const SenderName = styled.span`
   font-size: 12px;
   position: absolute;
   top: -5px;
   padding: 0px 5px;
   background: #fff;
   border-radius: 5px;
   color: var(--DARK-BLUE);
`
const SenderMessage = styled.span`
   font-weight: bold;
   font-style: italic;
`
interface Props {
   senderName: string
   message: string
   addedAt: string
}
const Message: React.FC<Props> = ({ senderName, message, addedAt }) => {
   return (
      <MessageItem>
         <SenderName>{senderName}</SenderName>
         <SenderMessage>{message}</SenderMessage>
         <DateTime addedAt={addedAt} />
      </MessageItem>
   )
}
export default Message