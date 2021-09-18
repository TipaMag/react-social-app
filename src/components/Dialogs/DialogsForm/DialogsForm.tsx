import React, { FC } from 'react'
import styled from 'styled-components'
import { Field, reduxForm, InjectedFormProps } from 'redux-form'
import { maxLength } from '../../utils/validators/validators'
import { textareaField } from '../../common/FormsControls/FormsControls'
import Button from '../../../elements/Button'
import { DialogMessageValueData } from '../Dialogs'


const maxLength300 = maxLength(300)

interface OwnProps {
    onSubmit: (formData: DialogMessageValueData) => void
}
type Props = OwnProps & InjectedFormProps<DialogMessageValueData, OwnProps>

const AddMessageForm: FC<Props> = ({ handleSubmit, pristine, submitting }) => (

    <Form onSubmit={handleSubmit}>
        <Field name='newMessageBody' type='text' component={textareaField}
            placeholder='Enter you message...'
            validate={maxLength300}
        />
        <Button type="submit" disabled={pristine || submitting}>send</Button>
    </Form>
)

export default reduxForm<DialogMessageValueData, OwnProps>({
    form: 'dialogsAddMessageForm'
})(AddMessageForm)

const Form = styled.form`
    display: grid;
    grid-template-columns: 9fr 1fr;
    grid-gap: 10px;
    background-color: var(--WHITE);
  `