import React, { useEffect } from "react"
import styled from 'styled-components'
import { NavLink } from "react-router-dom"

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faHome, faComments, faUsers, faNewspaper, faMusic, faCogs } from "@fortawesome/free-solid-svg-icons"
import Counter from "../common/Counter/Counter"
import { useDispatch, useSelector } from "react-redux"
import { AppStateType } from "../../redux/redux-store"
import Friends from "./Friends/Friends"
import { getSidebarFriends } from "../../redux/sidebar-reducer"

const NavContainer = styled.nav`
  grid-area: navbar;
  align-self: start;
`
const NavList = styled.ul`
  list-style: none;
  margin: 0;
  padding: 0;
`
const ListItem = styled.li`
  cursor: pointer;
  transition: all 0.3s;
  border-radius: 5px;
  overflow: hidden;
  margin-bottom: 3px;
  & .active {
    background-color: var(--DARK-BLUE);
    color: var(--WHITE);
  }
  & .active svg {
    color: var(--WHITE);
  }
  &:hover {
    background-color: var(--LIGHT-BLUE);
  }
`
const StyledNavLink = styled(NavLink)`
  position: relative;
  display: flex;
  align-items: center;
  text-decoration: none;
  font-size: 16px;
  padding: 5px 10px;
  color: var(--DARK-BLUE);
`
const StyledIcon = styled(FontAwesomeIcon)`
  color: var(--DARK-BLUE);
  margin-right: 10px;
`

const Navbar: React.FC = () => {

  const dispatch = useDispatch()
  const isAuth = useSelector((state: AppStateType) => state.auth.isAuth)
  const friends = useSelector((state: AppStateType) => state.sidebar.friends)
  const newMessagesCount = useSelector((state: AppStateType) => state.dialogsPage.newMessagesCount)

  useEffect(() => {
    if(isAuth) {
      dispatch(getSidebarFriends())
    }
  }, [dispatch, isAuth])


  return (
    <NavContainer>
      <NavList>
        <ListItem>
          <StyledNavLink to="/profile" activeClassName="active">
            <StyledIcon icon={faHome} />
            Profile
          </StyledNavLink>
        </ListItem>
        <ListItem>
          <StyledNavLink to="/dialogs" activeClassName="active">
            <StyledIcon icon={faComments} />
            Messages
            {newMessagesCount > 0 && isAuth && (
              <Counter count={newMessagesCount} />
            )}
          </StyledNavLink>
        </ListItem>
        <ListItem>
          <StyledNavLink to="/users" activeClassName="active">
            <StyledIcon icon={faUsers} />
            Users
          </StyledNavLink>
        </ListItem>
        <ListItem>
          <StyledNavLink to="/News" activeClassName="active">
            <StyledIcon icon={faNewspaper} />
            News
          </StyledNavLink>
        </ListItem>
        <ListItem>
          <StyledNavLink to="/Music" activeClassName="active">
            <StyledIcon icon={faMusic} />
            Music
          </StyledNavLink>
        </ListItem>
        <ListItem>
          <StyledNavLink to="/Settings" activeClassName="active">
            <StyledIcon icon={faCogs} />
            Settings
          </StyledNavLink>
        </ListItem>
      </NavList>

      {isAuth && 
        //@ts-ignore - решить трабл с возможным null
        <Friends friends={friends}/>
      }
    </NavContainer>
  )
}

export default Navbar
