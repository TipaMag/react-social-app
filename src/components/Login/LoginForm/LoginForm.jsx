import React from 'react'
import { Field, reduxForm } from 'redux-form'
import { inputField } from './../../common/FormsControls/FormsControls'
import { required, maxLength, email } from './../../utils/validators/validators'

const maxLength30 = maxLength(30)
const maxLength20 = maxLength(20)

const LoginForm = (props) => {
    const { handleSubmit, pristine, submitting } = props
    return (
        <form onSubmit={handleSubmit}>
            <div>
                <Field
                    name='email'
                    type='email'
                    component={inputField}
                    label='Email'
                    placeholder={'login'}
                    validate={[required, maxLength30, email]}
                />
            </div>
            <div>
                <Field
                    name='password'
                    type='password'
                    component={inputField}
                    label='Password'
                    placeholder={'password'}
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
            <div>
                <button type="submit" disabled={pristine || submitting}>
                    login
                </button>
            </div>
        </form>
    )
}

export default reduxForm({
    form: 'login'
})(LoginForm)