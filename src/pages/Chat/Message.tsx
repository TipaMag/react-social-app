import React from 'react'
import styled from 'styled-components'
import { ChatMessageType } from './ChatPage'

type Props = {
    message: ChatMessageType
}
export const ChatMessage: React.FC<Props> = ({message}) => {
    return(
        <MessageItemLi>
            <img height="50" style={{borderRadius: "50%"}} src={message.photo} alt=""/>
            <MessageBodyDiv>
                <span>{message.userName}</span>
                <MessageBodyTextP>{message.message}</MessageBodyTextP>
            </MessageBodyDiv>
        </MessageItemLi>
    )
}

const MessageItemLi = styled.li`
    display: flex;
    margin-bottom: 10px;
`
const MessageBodyDiv = styled.div`
    margin-left: 20px;
`
const MessageBodyTextP = styled.p`
    max-width: 700px;
    overflow-wrap: break-word;
    margin: 10px 0;
`