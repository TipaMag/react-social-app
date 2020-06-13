import React from 'react'
import styled from 'styled-components'
import { Field, reduxForm, InjectedFormProps } from 'redux-form'
import { maxLength } from '../../../utils/validators/validators'
import { textareaField } from '../../../common/FormsControls/FormsControls'
import Button from '../../../../elements/Button'


const maxLength10 = maxLength(300)

const Form = styled.form`
    display: grid;
    grid-template-columns: 8fr 2fr;
    grid-gap: 10px;
    margin-bottom: 10px;
    padding: 10px;
    background-color: var(--WHITE);
    & textarea {
        border: none;
    }
`

export type PostValue = {
    newPostBody: string
}

const AddPostForm: React.FC<InjectedFormProps<PostValue, {}>> = ({ handleSubmit, pristine, submitting }) => (

    <Form onSubmit={handleSubmit} >
        <Field
            name={'newPostBody'}
            placeholder={'Post message... (now offline)'}
            component={textareaField}
            validate={maxLength10}
        />
        <Button type="submit" disabled={pristine || submitting}>Add post</Button>
    </Form>
)

export default reduxForm<PostValue, {}>({
    form: 'profileAddPostForm'
})(AddPostForm)