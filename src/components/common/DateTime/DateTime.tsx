import React from 'react'
import styled from 'styled-components'

let Time = styled.span`
    font-size: 10px;
    position: absolute;
    top: -5px;
    right: 5px;
    padding: 0px 5px;
    background: #fff;
    color: var(--DARK-BLUE);
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