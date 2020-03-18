import React from 'react'
import styled from 'styled-components'

const CounterBody = styled.div`
    font-size: 11px;
    padding: 2px 4px;
    border-radius: 5px;
    border: 1px solid #fff;
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