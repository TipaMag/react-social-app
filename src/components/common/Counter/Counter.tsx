import React from 'react'
import styled from 'styled-components'

const CounterBody = styled.div`
    float: right;
    background: #bfbfbf;
    font-size: 11px;
    padding: 5px;
    border-radius: 11px;
`
interface Props {
    count: number
}

const Counter: React.FC<Props> = ({count})  => {
    return(
        <CounterBody>
            <span>{count}</span>
        </CounterBody>
    )
}
export default Counter