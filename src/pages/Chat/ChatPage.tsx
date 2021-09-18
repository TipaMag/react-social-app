import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { AddMessageForm } from './ChatMessageForm'
import { ChatMessage } from './Message'


export type ChatMessageType = {
    message: string
    photo: string
    userId: number
    userName: string
}

const ChatPage: React.FC = () => {
    const [wsChanel, setWsChanel] = useState<WebSocket | null>(null)
    const [messages, setMessages] = useState<ChatMessageType[]>([])
    const [readyStatus, setReadyStatus] = useState<'pending' | 'ready'>('pending')
    
    useEffect(() => {
        let ws: WebSocket

        const closeHandler = () => setTimeout( createChannel, 5000)
        
        function createChannel() {
            if (ws !== null && ws !== undefined) {
                ws.removeEventListener('close', closeHandler)
                ws.close()
            }
            ws = new WebSocket('wss://social-network.samuraijs.com/handlers/ChatHandler.ashx')
            ws.addEventListener('close', closeHandler)
            setWsChanel(ws)
        }
        createChannel()

        return () => {
            ws.removeEventListener('close', closeHandler)
            ws.close()
        }
    }, [])

    useEffect(() => {
        const openHendler = () => setReadyStatus('ready')
        wsChanel?.addEventListener('open', openHendler)

        return () => {
            wsChanel?.removeEventListener('open', openHendler)
        }
    }, [wsChanel])

    useEffect(() => {
        const messageHandler = (e: MessageEvent) => {
            let newMessages = JSON.parse(e.data)
            setMessages(prewMessages => [...prewMessages, ...newMessages])
        }
        wsChanel?.addEventListener('message', messageHandler)

        return () => {
            wsChanel?.removeEventListener('message', messageHandler)
        }
    }, [wsChanel])

    return(
        <ChatPageDiv>
            <ChatListUl>
                { messages.map( (message, i) => {
                        return <ChatMessage key={i} message={message}/>
                    })
                }
            </ChatListUl>
            <AddMessageForm wsChanel={wsChanel} readyStatus={readyStatus}/>
        </ChatPageDiv>
    )
}

const ChatPageDiv = styled.div`
    display: grid;
    grid-template-rows: 1fr 60px 30px;
`
const ChatListUl = styled.ul`
    list-style: none;
    padding: 0;
    margin: 0;
    height: 70vh;
    overflow-y: auto;
`
export default ChatPage