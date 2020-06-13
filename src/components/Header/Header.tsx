import React, { useState } from 'react'
import styled from 'styled-components'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import defaultUserImage from '../../assets/images/default-user-image.png'
import Clock from '../common/Clock/Clock'

import { logout } from '../../redux/auth-reducer'
import { AppStateType } from '../../redux/redux-store'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAngleDown } from '@fortawesome/free-solid-svg-icons'

const HeaderContainer = styled.header`
   display: flex;
   justify-content: space-between;
   align-items: center;
   grid-area: header;
   background: var(--DARK-BLUE);
   border-radius: 5px;
`
const Authorize = styled.div`
   position: relative;
   display: flex;
   align-items: center;
   padding: 4px;
   cursor: pointer;
   outline: none;
   &:hover {
      background-color: #3d6898;
   }
`
const UserName = styled.span`
   color: #fff;
   margin-right: 10px;
   margin-bottom: 4px;
`
const UserImage = styled.img`
   width: 28px;
   height: 28px;
   border-radius: 50%;
   margin-right: 10px;
`
const StyledIcon = styled(FontAwesomeIcon)`
   color: var(--WHITE);
`
const DropMenu = styled.ul`
   position: absolute;
   top: 45px;
   right: -8px;
   z-index: 100;
   margin: 0;
   padding: 4px 0px;
   list-style: none;
   border: 1px solid #c5d0db;
   border-radius: 4px;
   box-shadow: 0 1px 3px rgba(0,0,0,.1);
   background: #fff;
   width: 160px;
   &::before {
      position: absolute;
      pointer-events: none;
      border: solid transparent;
      content: '';
      height: 0;
      width: 0;
      bottom: 100%;
      right: 42px;
      border-width: 6px;
      margin: 0 -6px;
      border-bottom-color: #fff;
   }
`
const MenuStyledLink = styled(Link)`
   display: block;
   height: 30px;
   line-height: 30px;
   padding: 0 15px;
   text-decoration: none;
   color: #2a5885;
   &:hover {
      background-color: #e4eaf0;
   }
`
const LoginStyledLink = styled(Link)`
   background-color: #6ea6ce;
   display: inline-block;
   cursor: pointer;
   color: #ffffff;
   font-size: 15px;
   font-weight: bold;
   padding: 8px 15px;
   text-decoration: none;
   &:hover {
      background-color:#b34332;
   }
`

const Header: React.FC = () => {

   const dispatch = useDispatch()
   const userName = useSelector((state: AppStateType) => state.auth.login)
   const isAuth = useSelector((state: AppStateType) => state.auth.isAuth)
   const smallPhoto = useSelector((state: AppStateType) => state.auth.smallPhoto)

   let [toggleMode, setToggleMode] = useState(false)

   const handleToggleMenu = () => setToggleMode(!toggleMode)
   const onLogout = () => dispatch(logout())

   return (
      <HeaderContainer>
         <Clock />
         {isAuth
            ? <Authorize onClick={handleToggleMenu}>
                  <UserName>{userName}</UserName>
                  <UserImage src={smallPhoto || defaultUserImage} alt="userImage"></UserImage>
                  <StyledIcon icon={faAngleDown} />
                  {toggleMode &&
                     <DropMenu>
                        <li>
                           <MenuStyledLink onClick={onLogout} to='/login' >logout</MenuStyledLink>
                        </li>
                        <li>
                           <MenuStyledLink to='/profile/edit' >edit profile</MenuStyledLink>
                        </li>
                     </DropMenu>
                  }
               </Authorize>
            : <LoginStyledLink to='/login' >Login</LoginStyledLink>
         }
      </HeaderContainer>
   );
}

export default Header