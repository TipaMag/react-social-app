import React from "react"
import { connect } from "react-redux"
import { login, getCaptchaUrl } from '../../redux/auth-reducer'
import LoginReduxForm from './LoginForm/LoginForm'
import { Redirect } from 'react-router-dom'


const Login = ({isAuth, login, captchaUrl, getCaptchaUrl}) => {

    const onSubmit = (values) => {
        let { email, password, rememberMe, captcha } = values
        login(email, password, rememberMe, captcha)
    }
    if(isAuth) {
        return (
            <Redirect to='/profile' />
        )
    }
    return (
        <div>
            <h1>Login</h1>
            <LoginReduxForm onSubmit={onSubmit} captchaUrl={captchaUrl} getCaptchaUrl={getCaptchaUrl}/>
        </div>
    )
}

const mapStateToProps = (state) => ({
    isAuth: state.auth.isAuth,
    captchaUrl: state.auth.captchaUrl
})
export default connect(mapStateToProps, {
    login, // thunk
    getCaptchaUrl // thunk
})(Login)