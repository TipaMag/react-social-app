import React from 'react'
import styled from 'styled-components'
import DateTime from '../../common/DateTime/DateTime'

const MessageItem = styled.li`
   padding: 7px 7px 4px;
   border: 1px solid #ccc;
   margin: 7px;
   position: relative;
`
const SenderName = styled.span`
   font-size: 12px;
   position: absolute;
   top: -10px;
   padding: 0px 5px;
   background: #fff;
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
const Message: React.FC<Props> = ({senderName, message, addedAt}) => {
   return (
      <MessageItem>
         <SenderName>{senderName}</SenderName>
         <SenderMessage>{message}</SenderMessage>
         <DateTime addedAt={addedAt}/>
      </MessageItem>
   )
}
export default Message