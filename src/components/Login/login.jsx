import React from "react"
import { connect } from "react-redux"
import { login } from '../../redux/auth-reducer'
import LoginReduxForm from './LoginForm/LoginForm'
import { Redirect } from 'react-router-dom'


const Login = (props) => {

    const onLogin = (values) => {
        let { email, password, rememberMe } = values
        props.login(email, password, rememberMe)
    }
    if(props.isAuth) {
        return (
            <Redirect to='/profile' />
        )
    }
    return (
        <div>
            <h1>Login</h1>
            <LoginReduxForm onSubmit={onLogin} />
        </div>
    )
}

const mapStateToProps = (state) => ({
    isAuth: state.auth.isAuth
})
export default connect(mapStateToProps, {
    login, // thunk
})(Login)