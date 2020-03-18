import React, { Component } from 'react'
import { Route, Redirect, Switch } from "react-router-dom"
import { connect } from 'react-redux'
import { initializeApp } from './redux/app-reducer'
import { compose } from 'redux'
import { withRouter } from 'react-router-dom'

import './App.css'
import Header from './components/Header/Header'
import Navbar from './components/Navbar/Navbar'
import Profile from './components/Profile/Profile'
import ProfileEdit from './components/ProfileEdit/ProfileEdit'
import Dialogs from './components/Dialogs/Dialogs'
import News from './components/News/News'
import Music from './components/Music/Music'
import Settings from './components/Settings/Settings'
import LoginPage from './components/Login/login'
import Preloader from './components/common/Preloader/Preloader'
import NotFound from './components/common/NotFound/NotFound'


import withSuspense from './components/Hoc/withSuspense'
const Users = React.lazy(() => import('./components/Users/Users'))



class App extends Component {
        componentDidMount() {
                this.props.initializeApp()
        }
        render() {
                if (!this.props.initialized) return <Preloader />
                return (
                        <div className='app-wrapper'>
                                <Header />
                                <Navbar />
                                <div className='app-wrapper-content'>
                                        <Switch>
                                                <Route exact path="/"
                                                        render={() => <Redirect to='/profile' />} />
                                                <Route exact path="/profile/edit"
                                                        render={() => <ProfileEdit />} />
                                                <Route path='/profile/:userId?'
                                                        render={() => <Profile />} />
                                                <Route path='/dialogs/:userId?'
                                                        render={() => <Dialogs />} />
                                                <Route path='/News'
                                                        component={News} />
                                                <Route path='/Music'
                                                        component={Music} />
                                                <Route path='/users'
                                                        render={withSuspense(Users)} />
                                                <Route path='/Settings'
                                                        component={Settings} />
                                                <Route path='/Login'
                                                        render={() => <LoginPage />} />
                                                <Route path='/404'
                                                        render={() => <NotFound />} />
                                                <Route path='*'
                                                        render={() => <Redirect to='/404' />} />
                                        </Switch>
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
