import React from 'react'
import { Route } from "react-router-dom"
import './App.css'
import HeaderContainer from './components/Header/HeaderContainer'
import NavbarContainer from './components/Navbar/NavbarContainer'
import ProfileContainer from './components/Profile/ProfileContainer'
import DialogsContainer from './components/Dialogs/DialogsContainer'
import News from './components/News/News'
import Music from './components/Music/Music'
import UsersContainer from './components/Users/UsersContainer'
import Settings from './components/Settings/Settings'
import LoginPage from './components/Login/login'



const App = () => {
  return (
    <div className='app-wrapper'>
      <HeaderContainer />
      <NavbarContainer />
      <div className='app-wrapper-content'>
        <Route  path='/profile/:userId?'
                render={() => <ProfileContainer />} />
        <Route  path='/dialogs' 
                render={() => <DialogsContainer />} />
        <Route  path='/News' 
                component={News} />
        <Route  path='/Music' 
                component={Music} />
        <Route  path='/users' 
                render={() => <UsersContainer />} />
        <Route  path='/Settings' 
                component={Settings} />
        <Route  path='/Login' 
                render={() => <LoginPage />} />
      </div>
    </div>
  )
}

export default App
