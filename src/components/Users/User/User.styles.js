import styled from 'styled-components'

export const ListItem = styled.li`
   display: flex;
   justify-content: space-between;
   align-items: center;
   padding: 3px;
   border: 1px solid var(--DARK-BLUE);
   border-radius: 4px;
`
export const UserPhoto = styled.div`
    width: 50px;
    height: 50px;
    border-radius: 50%;
    overflow: hidden;
    margin-right: 20px;
    & a {
        display: flex;
    }
    & a img {
        width: 100%;
    }
`
export const UserInfo = styled.div`
    display: flex;
    flex-flow: column;
    flex-grow: 2;
`
export const UserInfoName = styled.span`

`
export const UserInfoTitle = styled.span`
    color: #afafaf;
`
export const SendMessageBtn = styled.div`
    
`
export const FollowingBtn = styled.div`
    margin: 0 20px;
`