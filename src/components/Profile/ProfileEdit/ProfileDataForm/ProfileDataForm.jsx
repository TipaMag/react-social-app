import React from 'react'
import s from './ProfileDataForm.module.css'
import { Field, reduxForm } from 'redux-form'
import { inputField, textareaField } from '../../../common/FormsControls/FormsControls'

const ProfileDataForm = ({ handleSubmit, profile, error }) => {
    return (
        <form className={s.profileDataForm} onSubmit={handleSubmit}>
            <div className={s.profileDataShort}>
                <div className={s.profileDataRow}>
                    <div className={s.rowLabel}>Full name:</div>
                    <Field name='fullName' type='text' component={inputField} />
                </div>
                <div className={s.profileDataRow}>
                    <div className={s.rowLabel}>Looking for a job:</div>
                    <Field name='lookingForAJob' type='checkbox' component={inputField} />
                </div>
                <div className={s.profileDataRow}>
                    <div className={s.rowLabel}>My professional skills:</div>
                    <Field name='lookingForAJobDescription' placeholder={'My professional skills'} component={textareaField} />
                </div>
                <div className={s.profileDataRow}>
                    <div className={s.rowLabel}>About me:</div>
                    <Field name='aboutMe' placeholder={'About me'} component={textareaField} />
                </div>
            </div>
            <div className={s.profileDataContacts}>
                <span>contacts</span>
                {Object.keys(profile.contacts).map(key => {
                    return (
                        <div className={s.profileDataRow} key={key}>
                            <div className={s.rowLabel}>{key}:</div>
                            <Field name={`contacts.${key}`} placeholder={key} component={inputField} />
                        </div>
                    )
                })}
            </div>
            {error &&
                <div className={s.commonError}>
                    {error}
                </div>
            }
            <button type='submit'>save</button>
        </form>
    )
}

export default reduxForm({
    form: 'edit-profile'
})(ProfileDataForm)
