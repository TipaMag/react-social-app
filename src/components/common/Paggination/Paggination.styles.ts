import styled from "styled-components"

export const Container = styled.div `
    display: inline-flex;
    flex-flow: row nowrap;
`

interface PageNumberProps {
    selectedPage: boolean
}
export const PageNumber = styled.div<PageNumberProps>`
    color: ${props => props.selectedPage ? "#fff" : "#000"};
    background-color: ${props => props.selectedPage ? "#6ea6ce" : "transparent"};
    border: 1px solid ${props => props.selectedPage ? "#6ea6ce" : "#ccc"};
    cursor: pointer;
    padding: 0 2px;
    margin: 0 2px;
    border-radius: 3px;
    line-height: 30px;
`
