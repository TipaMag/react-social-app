import React from "react"
import styled from 'styled-components'
import { useSelector, useDispatch } from "react-redux"
import { login, getCaptchaUrl } from '../../redux/auth-reducer'
import LoginReduxForm from './LoginForm/LoginForm'
import { Redirect } from 'react-router-dom'
import { AppStateType } from "../../redux/redux-store"

const LoginContainer = styled.div`
    border: 1px solid var(--DARK-GRAY);
    padding: 20px;
    border-radius: 5px;
    max-width: 250px;
    margin: 0 auto;
    background-color: var(--WHITE);
`
const Title = styled.span`
    display: block;
    margin-bottom: 20px;
    text-align: center;
    font-size: 30px;
`
const TestAccessContainer = styled.div`
    margin-top: 10px;
    background-color: darksalmon;
    padding: 10px;
    font-size: 12px;
    border-radius: 5px;
    & p {
        text-transform: uppercase;
        letter-spacing: 2px;
        display: block;
        text-align: center;
    }
    & span {
        width: 70px;
        display: inline-block;
    }
`

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
        <LoginContainer>
            <Title>Login</Title>
            <LoginReduxForm onSubmit={onSubmit} captchaUrl={captchaUrl} getCaptchaUrl={getCaptchaUrl} />

            <TestAccessContainer>
                <p>test access</p>
                <div>
                    <span>Email:</span>
                    <strong>free@samuraijs.com</strong>
                </div>
                <div>
                    <span>Password:</span>
                    <strong>free</strong>
                </div>
            </TestAccessContainer>
        </LoginContainer>
    )
}
export default Login