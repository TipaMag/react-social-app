import React from 'react'
import s from './PostsForm.module.css'
import { Field, reduxForm, InjectedFormProps } from 'redux-form'
import { maxLength } from '../../../utils/validators/validators'
import { textareaField } from '../../../common/FormsControls/FormsControls'
import Button from '../../../../elements/Button'


const maxLength10 = maxLength(300)

interface OwnProps {
    onSubmit: (values: any) => void
}
type Props = OwnProps & InjectedFormProps<{}, OwnProps>
const AddPostForm: React.FC<Props> = ({ handleSubmit, pristine, submitting }) => {
    return (
        <form className={s.addPostForm} onSubmit={handleSubmit} >
            <Field
                name={'newPostBody'}
                placeholder={'Post message... (now offline)'}
                component={textareaField}
                validate={maxLength10}
            />
            <Button type="submit" disabled={pristine || submitting}>Add post</Button>
        </form>
    )
}
export default reduxForm<{}, OwnProps>({
    form: 'profileAddPostForm'
})(AddPostForm)