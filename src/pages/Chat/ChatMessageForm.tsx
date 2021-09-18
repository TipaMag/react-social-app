import React, { useState } from 'react';

type Props = {
    wsChanel: WebSocket | null
    readyStatus: string
}
export const AddMessageForm: React.FC<Props> = ({wsChanel, readyStatus}) => {
    const [message, setMessage] = useState<string>('')

    const sendMessage = () => {
        if (!message) return
        wsChanel?.send(message)
        setMessage('')
    }

    return(
        <div>
            <textarea onChange={(e) => setMessage(e.target.value)} value={message}></textarea>
            <button disabled={readyStatus !== 'ready'} onClick={sendMessage}>send</button>
        </div>
    )
}