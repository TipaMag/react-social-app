import React from 'react'
import s from './DialogsForm.module.css'
import { Field, reduxForm } from 'redux-form'
import { maxLength } from './../../utils/validators/validators'
import { textareaField } from './../../common/FormsControls/FormsControls'


const maxLength10 = maxLength(10)

const AddMessageForm = (props) => {
    const { handleSubmit, pristine, submitting } = props
    return (
        <form onSubmit={handleSubmit} className={s.addPostForm}>
            <Field
                name={'newMessageBody'}
                placeholder={'Enter you message...'}
                component={textareaField}
                validate={maxLength10}
            />
            <button type="submit" disabled={pristine || submitting}>
                Add message
            </button>
        </form>
    )
}
export default reduxForm({
    form: 'dialogsAddMessageForm'
})(AddMessageForm)