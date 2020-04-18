import React from "react"
import s from './Login.module.css'
import { useSelector, useDispatch } from "react-redux"
import { login, getCaptchaUrl } from '../../redux/auth-reducer'
import LoginReduxForm from './LoginForm/LoginForm'
import { Redirect } from 'react-router-dom'
import { AppStateType } from "../../redux/redux-store"

export interface ILoginFormData {
    email: string
    password: string
    rememberMe: boolean
    captcha?: string
}
const Login: React.FC = () => {
    const dispatch = useDispatch()
    const isAuth = useSelector((state: AppStateType) => state.auth.isAuth)
    const captchaUrl = useSelector((state: AppStateType) => state.auth.captchaUrl)

    const onSubmit = (formData: ILoginFormData) => {
        dispatch(login(formData.email, formData.password, formData.rememberMe, formData.captcha))
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
export default Login





// type Props = MapStateProps & MapDispatchProps

// interface MapStateProps {
//     isAuth: boolean
//     captchaUrl: string | null
// }
// interface MapDispatchProps {
//     login: (email: string, password: string, rememberMe: boolean, captha?: string) => void
//     getCaptchaUrl: () => void
// }
// const mapStateToProps = (state: AppStateType) => ({
//     isAuth: state.auth.isAuth,
//     captchaUrl: state.auth.captchaUrl
// })
// export default connect<MapStateProps, MapDispatchProps, {}, AppStateType>(mapStateToProps, {
//     login,
//     getCaptchaUrl
// })(Login)