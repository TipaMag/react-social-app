import React from 'react'
import DateTime from '../../common/DateTime/DateTime'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrashAlt } from '@fortawesome/free-solid-svg-icons'
import { MessageItem, SenderName, MessageBody, TrashBtn } from './Message.styles'
import { MessageType } from '../../../types/Dialogs-types'


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