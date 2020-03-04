import styled from 'styled-components'

export default styled.button`
    color: #fff;
    background-color: var(--DARK-BLUE);
    font-size: 14px;
    padding: 4px 13px;
    border: none;
    cursor: pointer;
    outline: none;
    transition: 0.2s;
    &:hover {
        background-color: var(--LIGHT-BLUE);
    }
    &:active {
        transform: translateY(1px) 
    }
`