import React from 'react'
import styled from 'styled-components'

const Counter = (props)  => {
    return(
        <CounterBody>
            <span>{props.count}</span>
        </CounterBody>
    )
}
export default Counter

const CounterBody = styled.div`
    float: right;
    background: #bfbfbf;
    font-size: 11px;
    padding: 5px;
    border-radius: 11px;
`