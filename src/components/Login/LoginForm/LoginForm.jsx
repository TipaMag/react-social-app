import React from 'react'
import { Field, reduxForm } from 'redux-form'
import { inputField } from './../../common/FormsControls/FormsControls'
import { required, maxLength, email } from './../../utils/validators/validators'
import s from './LoginForm.module.css'
import Button from '../../../elements/Button'

const maxLength30 = maxLength(30)
const maxLength20 = maxLength(20)

const LoginForm = (props) => {
    const { handleSubmit, pristine, submitting, error, captchaUrl, getCaptchaUrl } = props
    return (
        <form className={s.loginForm} onSubmit={handleSubmit}>
            <div>
                <Field
                    name='email'
                    type='email'
                    component={inputField}
                    // label='Email'
                    placeholder={'Email'}
                    validate={[required, maxLength30, email]}
                />
            </div>
            <div>
                <Field
                    name='password'
                    type='password'
                    component={inputField}
                    // label='Password'
                    placeholder={'Password'}
                    validate={[required, maxLength20]}
                />
            </div>
            <div>
                <Field
                    name='rememberMe'
                    type='checkbox'
                    component={inputField}
                    label='Remember me'
                />
            </div>
            { captchaUrl &&
                <div>
                    <img src={captchaUrl} alt="captcha"/>
                    <Field 
                        name='captcha'
                        component={inputField}
                        placeholder={'enter symbols'}
                        validate={[required]}
                    />
                    <button onClick={() => {getCaptchaUrl()}}>update</button>
                </div>
            }
            <Button className={s.loginBtn} type="submit" disabled={pristine || submitting}>sign in</Button>
            {error &&
                <div className={s.commonError}>{error}</div>
            }
        </form>
    )
}

export default reduxForm({
    form: 'login'
})(LoginForm)