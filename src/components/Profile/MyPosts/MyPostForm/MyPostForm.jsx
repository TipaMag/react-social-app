import React from 'react'
import s from './MyPostForm.module.css'
import { Field, reduxForm } from 'redux-form'
import { maxLength } from '../../../utils/validators/validators'
import { textareaField } from '../../../common/FormsControls/FormsControls'
import Button from './../../../../elements/Button'


const maxLength10 = maxLength(300)

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
            <Button type="submit" disabled={pristine || submitting}>Add post</Button>
        </form>
    )
}
export default reduxForm({
    form: 'profileAddPostForm'
})(AddPostForm)