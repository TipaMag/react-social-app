import React from 'react'
import styled from 'styled-components'

let Time = styled.span`
    font-size: 10px;
    position: absolute;
    top: -8px;
    right: 0px;
    padding: 0px 5px;
    background: #fff;
    color: #adadad;
`
interface Props {
    addedAt: string
}

let DateTime: React.FC<Props> = (props) => {
    let date = new Date(Date.parse(props.addedAt))
    let timeWithouthSecond = date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })

    return (
        <Time>{timeWithouthSecond}</Time>
    )
}

export default DateTime