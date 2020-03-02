import React from 'react'
import s from './ProfileDataForm.module.css'
import { Field, reduxForm, InjectedFormProps } from 'redux-form'
import { inputField, textareaField } from '../../common/FormsControls/FormsControls'
import Button from '../../../elements/Button'
import { ProfileType } from '../../../types/Profile-types'

interface OwnProps {
    onSubmit: (values: any) => void
    autorizedProfile: ProfileType
}
type Props = OwnProps & InjectedFormProps<{}, OwnProps>
const ProfileDataForm: React.FC<Props> = ({ handleSubmit, autorizedProfile, error }) => {
    return (
        <form className={s.profileDataForm} onSubmit={handleSubmit}>
            <div className={s.profileDataShort}>
                <div className={s.profileDataRow}>
                    <div className={s.rowLabel}>Name:</div>
                    <Field name='fullName' type='text' component={inputField} />
                </div>
                <div className={s.profileDataRow}>
                    <div className={s.rowLabel}>Looking for a job:</div>
                    <Field name='lookingForAJob' type='checkbox' component={inputField} />
                </div>
                <div className={s.profileDataRow}>
                    <div className={s.rowLabel}>My skills:</div>
                    <Field name='lookingForAJobDescription' placeholder={'My skills'} component={textareaField} />
                </div>
                <div className={s.profileDataRow}>
                    <div className={s.rowLabel}>About me:</div>
                    <Field name='aboutMe' placeholder={'About me'} component={textareaField} />
                </div>
            </div>
            <div className={s.profileDataContacts}>
                <span>contacts</span>
                {Object.keys(autorizedProfile.contacts).map(key => {
                    return (
                        <div className={s.profileDataRow} key={key}>
                            <div className={s.rowLabel}>{key}:</div>
                            <Field name={`contacts.${key}`} type='text' placeholder={key} component={inputField} />
                        </div>
                    )
                })}
            </div>
            {error &&
                <div className={s.commonError}>
                    {error}
                </div>
            }
            <Button type='submit'>save</Button>
        </form>
    )
}

export default reduxForm<{}, OwnProps>({
    form: 'edit-profile'
})(ProfileDataForm)
