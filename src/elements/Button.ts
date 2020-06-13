import styled from 'styled-components'

export default styled.button`
    background-color: ${props => props.disabled ? 'var(--DARK-GRAY)' : 'var(--DARK-BLUE)'};
    color: #fff;
    border-radius: 4px;
    font-size: 14px;
    padding: 4px 13px;
    border: none;
    cursor: pointer;
    outline: none;
    transition: 0.2s;
    &:hover {
        background-color: var(--LIGHT-BLUE);
        color: var(--DARK-BLUE);
    }
    &:active {
        transform: translateY(1px) 
    }
`