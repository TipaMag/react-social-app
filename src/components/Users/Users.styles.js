import styled from 'styled-components'

export const Container = styled.div`
    display: flex;
    flex-flow: column;
    height: 100%;
`
export const Controls = styled.div`
   display: flex;
   margin-bottom: 10px;
`

export const UsersList = styled.ul`
   display: grid;
   grid-gap: 5px;
   margin: 0;
   padding: 0;
   list-style: none;
`
export const NoUsers = styled.div`
   display: flex;
   justify-content: center;
   align-items: center;
   height: 100%;
   box-shadow: 3px 3px 5px rgba(0,0,0,0.2),
               -3px -3px 5px rgba(255,255,255,0.5);
   & span {
      font-size: 30px;
      color: var(--DARK-GRAY);
   }
`