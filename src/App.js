import React, { Component } from 'react'
import { Route, Redirect } from "react-router-dom"
import { connect } from 'react-redux'
import { initializeApp } from './redux/app-reducer'
import { compose } from 'redux'
import { withRouter } from 'react-router-dom'

import './App.css'
import HeaderContainer from './components/Header/HeaderContainer'
import NavbarContainer from './components/Navbar/NavbarContainer'
import ProfileContainer from './components/Profile/ProfileContainer'
import DialogsContainer from './components/Dialogs/DialogsContainer'
import News from './components/News/News'
import Music from './components/Music/Music'
import Settings from './components/Settings/Settings'
import LoginPage from './components/Login/login'
import Preloader from './components/common/Preloader/Preloader'

import withSuspense from './components/Hoc/withSuspense'
const UsersContainer = React.lazy(() => import('./components/Users/UsersContainer'))



class App extends Component {
        componentDidMount() {
                this.props.initializeApp()
        }
        render() {
                if (!this.props.initialized) {
                        return (
                                <Preloader />
                        )
                }
                return (
                        <div className='app-wrapper'>
                                <HeaderContainer />
                                <NavbarContainer />
                                <div className='app-wrapper-content'>
                                        <Route path="/"
                                                render={() => <Redirect to='/profile' />} />
                                        <Route path='/profile/:userId?'
                                                render={() => <ProfileContainer />} />
                                        <Route path='/dialogs/:userId?'
                                                render={() => <DialogsContainer />} />
                                        <Route path='/News'
                                                component={News} />
                                        <Route path='/Music'
                                                component={Music} />
                                        <Route path='/users'
                                                render={withSuspense(UsersContainer)} />
                                        <Route path='/Settings'
                                                component={Settings} />
                                        <Route path='/Login'
                                                render={() => <LoginPage />} />
                                </div>
                        </div>
                )
        }
}
const mapStateToProps = (state) => ({
        initialized: state.app.initialized
})

export default compose(
        withRouter,
        connect(mapStateToProps, {
                initializeApp
        })
)(App)
