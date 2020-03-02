import styled from "styled-components"

export const PagginationContainer = styled.div `
    display: inline-flex;
    flex-flow: row nowrap;
    padding: 5px;
`

interface PageNumberProps {
    selectedPage: any
}
export const PageNumber = styled.div<PageNumberProps>`
    color: ${props => props.selectedPage ? "#fff" : "#000"};
    background-color: ${props => props.selectedPage ? "#6ea6ce" : "#fff"};
    cursor: pointer;
    padding: 0 2px;
    margin: 0 2px;
    &:hover {
        color: blue;
    }
`
