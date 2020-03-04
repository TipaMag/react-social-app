import React from "react"
import s from './Login.module.css'
import { connect } from "react-redux"
import { login, getCaptchaUrl } from '../../redux/auth-reducer'
import LoginReduxForm from './LoginForm/LoginForm'
import { Redirect } from 'react-router-dom'
import { AppStateType } from "../../redux/redux-store"

type Props = MapStateProps & MapDispatchProps
const Login: React.FC<Props> = ({ isAuth, captchaUrl, login, getCaptchaUrl }) => {

    const onSubmit = (values: any) => {
        let { email, password, rememberMe, captcha } = values
        login(email, password, rememberMe, captcha)
    }
    if (isAuth) return <Redirect to='/profile' />
    return (
        <div className={s.login}>
            <span className={s.loginTitle}>Login</span>
            <LoginReduxForm onSubmit={onSubmit} captchaUrl={captchaUrl} getCaptchaUrl={getCaptchaUrl} />
            <div className={s.testAccess}>
                <span className={s.testAccessTitle}>test access</span>
                <div>
                    <span>Email:</span>
                    <strong>free@samuraijs.com</strong>
                </div>
                <div>
                    <span>Password:</span>
                    <strong>free</strong>
                </div>
            </div>
        </div>
    )
}

interface MapStateProps {
    isAuth: boolean
    captchaUrl: string | null
}
interface MapDispatchProps {
    login: (email: string, password: string, rememberMe: boolean, captha?: string) => void
    getCaptchaUrl: () => void
}
const mapStateToProps = (state: AppStateType) => ({
    isAuth: state.auth.isAuth,
    captchaUrl: state.auth.captchaUrl
})
export default connect<MapStateProps, MapDispatchProps, null, AppStateType>(mapStateToProps, {
    login,
    getCaptchaUrl
})(Login)