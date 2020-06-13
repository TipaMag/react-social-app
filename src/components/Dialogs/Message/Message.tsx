import React from 'react'
import styled from 'styled-components'
import DateTime from '../../common/DateTime/DateTime'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrashAlt } from '@fortawesome/free-solid-svg-icons'
import { MessageType } from '../../../types/Dialogs-types'

const MessageItem = styled.li`
   padding: 20px 35px 5px 10px;
   margin: 5px 0px;
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
const SenderName = styled.span`
   font-size: 12px;
   position: absolute;
   top: 0;
   left: 25px;
   color: var(--DARK-BLUE);
`
const MessageBody = styled.span`
   display: flex;
`
const TrashBtn = styled.button`
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

interface Props {
   message: MessageType
   onRemoveMessage: (messageId: string) => void
}
const Message: React.FC<Props> = ({
   message: { id, senderName, body, addedAt },
   onRemoveMessage
}) => {
   const handleClick = () => {
      onRemoveMessage(id)
   }
   return (
      <MessageItem>
         <SenderName>{senderName}</SenderName>
         <MessageBody>{body}</MessageBody>
         <TrashBtn onClick={handleClick} type='button'>
            <FontAwesomeIcon icon={faTrashAlt} />
         </TrashBtn>
         <DateTime addedAt={addedAt} />
      </MessageItem>
   )
}
export default Message