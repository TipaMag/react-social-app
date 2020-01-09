import React from 'react'
import s from './DialogsForm.module.css'
import { Field, reduxForm } from 'redux-form'
import { maxLength } from './../../utils/validators/validators'
import { textareaField } from './../../common/FormsControls/FormsControls'


const maxLength300 = maxLength(300)

const AddMessageForm = ({ handleSubmit, pristine, submitting }) => {
    return (
        <form onSubmit={handleSubmit} className={s.addPostForm}>
            <Field
                name={'newMessageBody'}
                placeholder={'Enter you message...'}
                component={textareaField}
                validate={maxLength300}
            />
            <button type="submit" disabled={pristine || submitting}>add message</button>
        </form>
    )
}
export default reduxForm({
    form: 'dialogsAddMessageForm'
})(AddMessageForm)