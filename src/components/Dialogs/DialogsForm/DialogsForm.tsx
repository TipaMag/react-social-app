import React from 'react'
import styled from 'styled-components'
import { Field, reduxForm, InjectedFormProps } from 'redux-form'
import { maxLength } from '../../utils/validators/validators'
import { textareaField } from '../../common/FormsControls/FormsControls'
import Button from '../../../elements/Button'

const Form = styled.form`
    display: grid;
    grid-template-columns: 8fr 2fr;
    grid-gap: 10px;
    background-color: var(--WHITE);
  `

const maxLength300 = maxLength(300)

interface OwnProps {
    onSubmit: (values: any) => void
}
type Props = OwnProps & InjectedFormProps<{}, OwnProps>
const AddMessageForm: React.FC<Props> = ({ handleSubmit, pristine, submitting }) => {
    return (
        <Form onSubmit={handleSubmit}>
            <Field
                name={'newMessageBody'}
                placeholder={'Enter you message...'}
                component={textareaField}
                validate={maxLength300}
            />
            <Button type="submit" disabled={pristine || submitting}>send message</Button>
        </Form>
    )
}
export default reduxForm<{}, OwnProps>({
    form: 'dialogsAddMessageForm'
})(AddMessageForm)