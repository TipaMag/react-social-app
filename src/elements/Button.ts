import styled from 'styled-components'

export default styled.button`
    color: #fff;
    background-color: #6ea6ce;
    font-size: 14px;
    padding: 4px 13px;
    border: none;
    cursor: pointer;
    outline: none;
    transition: 0.2s;
    &:hover {
        background-color: #256fa5;
    }
    &:active {
        transform: translateY(1px) 
    }
`