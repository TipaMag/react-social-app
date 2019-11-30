import React from 'react'
import s from './MyPostForm.module.css'
import { Field, reduxForm } from 'redux-form'
import { maxLength } from '../../../utils/validators/validators'
import { textareaField } from '../../../common/FormsControls/FormsControls'


const maxLength10 = maxLength(10)

const AddPostForm = (props) => {
    const { handleSubmit, pristine, submitting } = props
    return (
        <form onSubmit={handleSubmit} className={s.addPostForm}>
            <Field
                name={'newPostBody'}
                placeholder={'Post message'}
                component={textareaField}
                validate={maxLength10}
            />
            <button type="submit" disabled={pristine || submitting}>
                Add post
            </button>
        </form>
    )
}
export default reduxForm({
    form: 'profileAddPostForm'
})(AddPostForm)