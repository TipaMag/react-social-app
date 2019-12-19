import React from 'react'
import s from './ProfileDataForm.module.css'
import { Field, reduxForm } from 'redux-form'
import { inputField, textareaField } from '../../../common/FormsControls/FormsControls'

const ProfileDataForm = (props) => {
    const { handleSubmit, profile, error } = props
    return (
        <form onSubmit={handleSubmit}>
            <div><button>save</button></div>
            {
                error &&
                <div className={s.commonError}>
                    {error}
                </div>
            }
            <div >
                <div>
                    <b>Full name</b>: <Field name='fullName' type='text' component={inputField} />
                </div>
                <div>
                    <b>Looking for a job</b>: <Field name='lookingForAJob' type='checkbox' component={inputField} />
                </div>
                <div>
                    <b>My professional skills</b>: <Field name='lookingForAJobDescription' placeholder={'My professional skills'} component={textareaField} />
                </div>
                <div>
                    <b>About me</b>: <Field name='aboutMe' placeholder={'About me'} component={textareaField} />
                </div>
            </div>
            contacts:
            <ul className={s.userContactsList}>
                {Object.keys(profile.contacts).map(key => {
                    return (
                        <li key={key}><b>{key}:</b><Field name={`contacts.${key}`} placeholder={key} component={inputField} /></li>
                    )
                })}
            </ul>
        </form>
    )
}

export default reduxForm({
    form: 'edit-profile'
})(ProfileDataForm)
