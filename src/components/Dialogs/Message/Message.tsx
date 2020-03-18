import React from 'react'
import DateTime from '../../common/DateTime/DateTime'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrashAlt } from '@fortawesome/free-solid-svg-icons'
import { MessageItem, SenderName, SenderMessage, TrashBtn } from './Message.styles'


interface Props {
   messageId: string
   senderName: string
   message: string
   addedAt: string
   onRemoveMessage: (messageId: string) => void
}
const Message: React.FC<Props> = ({ messageId, senderName, message, addedAt, onRemoveMessage }) => {
   const handleClick = () => {
      onRemoveMessage(messageId)
   }
   return (
      <MessageItem>
         <SenderName>{senderName}</SenderName>
         <SenderMessage>{message}</SenderMessage>
         <TrashBtn onClick={handleClick} type='button'>
            <FontAwesomeIcon icon={faTrashAlt}/>
         </TrashBtn>
         <DateTime addedAt={addedAt} />
      </MessageItem>
   )
}
export default Message