import React from 'react'
import styled from 'styled-components'
import { Field, reduxForm, InjectedFormProps } from 'redux-form'
import { inputField, inputCheckboxField } from '../../common/FormsControls/FormsControls'
import { required, maxLength, email } from '../../utils/validators/validators'
import Button from '../../../elements/Button'
import { ILoginFormData } from '../Login'

const CaptchaContainer = styled.div`
    margin-bottom: 10px;
`
const LoginBtn = styled(Button)`
    width: 100%;
    padding: 10px;
`
const CommonErrorMsg = styled.div`
    margin-top: 10px;
    background-color: #ffb6b6;
    padding: 10px;
    border-radius: 5px;
`

const maxLength30 = maxLength(30)
const maxLength20 = maxLength(20)

interface Props {
    captchaUrl: string | null
    getCaptchaUrl: () => void
    onSubmit: (formData: ILoginFormData) => void
}
const LoginForm: React.FC<Props & InjectedFormProps<ILoginFormData, Props>> = ({ handleSubmit, pristine, submitting, error, captchaUrl, getCaptchaUrl }) => {
    return (
        <form onSubmit={handleSubmit}>
            <Field name='email' type='email' component={inputField}
                placeholder={'Email'}
                validate={[required, maxLength30, email]}
            />
            <Field name='password' type='password' component={inputField}
                placeholder={'Password'}
                validate={[required, maxLength20]}
            />
            <Field name='rememberMe' type='checkbox' component={inputCheckboxField}
                label='Remember me'
            />
            {captchaUrl &&
                <CaptchaContainer>
                    <img src={captchaUrl} alt="captcha" />
                    <Field name='captcha' type='text' component={inputField}
                        placeholder={'enter symbols'}
                        validate={[required]}
                    />
                    <button onClick={() => { getCaptchaUrl() }}>update</button>
                </CaptchaContainer>
            }
            <LoginBtn type="submit" disabled={pristine || submitting}>Login</LoginBtn>
            {error &&
                <CommonErrorMsg>{error}</CommonErrorMsg>
            }
        </form>
    )
}
export default reduxForm<ILoginFormData, Props>({
    form: 'login'
})(LoginForm)