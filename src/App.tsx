import React, { Component } from 'react'
import { withRouter, Route, Redirect, Switch } from "react-router-dom"
import { connect } from 'react-redux'
import { compose } from 'redux'
import { initializeApp } from './redux/app-reducer'

import './App.css'

import { Header, Navbar, Profile, ProfileEdit, Dialogs, News, Music, Settings, Login } from './components'
import { Preloader, NotFound } from './components/common'

import withSuspense from './components/Hoc/withSuspense'
import { AppStateType } from './redux/redux-store'

const Users = React.lazy(() => import('./components/Users/Users'))

type Props = MapStateProps & MapDispatchProps

class App extends Component<Props> {
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
                                                <Route exact path="/" render={() => <Redirect to='/profile' />} />
                                                <Route exact path="/profile/edit" render={() => <ProfileEdit />} />
                                                <Route path='/profile/:userId?' render={() => <Profile />} />
                                                <Route path='/dialogs/:userId?' render={() => <Dialogs />} />
                                                <Route path='/News' component={News} />
                                                <Route path='/Music' component={Music} />
                                                <Route path='/users' component={withSuspense(Users)} />
                                                <Route path='/Settings' component={Settings} />
                                                <Route path='/Login' render={() => <Login />} />
                                                <Route path='/404' render={() => <NotFound />} />
                                                <Route path='*' render={() => <Redirect to='/404' />} />
                                        </Switch>
                                </div>
                        </div>
                )
        }
}

type MapStateProps = ReturnType<typeof mapStateToProps>

const mapStateToProps = (state: AppStateType) => ({
        initialized: state.app.initialized
})
type MapDispatchProps = {
        initializeApp: () => void
}

export default compose(
        connect(mapStateToProps, {
                initializeApp
        }),
        withRouter
)(App)
