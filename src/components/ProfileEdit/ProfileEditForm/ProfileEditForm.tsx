import React from 'react'
import styled from 'styled-components'
import { Field, reduxForm, InjectedFormProps } from 'redux-form'
import { inputField, textareaField, inputCheckboxField } from '../../common/FormsControls/FormsControls'
import Button from '../../../elements/Button'
import { ProfileType } from '../../../types/Profile-types'


type Props = {
    autorizedProfile: ProfileType
}
const ProfileEditForm: React.FC<Props & InjectedFormProps<ProfileType, Props>> = ({ handleSubmit, autorizedProfile, error }) => (

    <form onSubmit={handleSubmit}>
        <FormRow>
            <RowLabel>Name:</RowLabel>
            <Field name='fullName' type='text' component={inputField} />
        </FormRow>
        <FormRow>
            <RowLabel>Looking for a job:</RowLabel>
            <Field name='lookingForAJob' type='checkbox' component={inputCheckboxField} />
        </FormRow>
        <FormRow>
            <RowLabel>My skills:</RowLabel>
            <Field name='lookingForAJobDescription' placeholder={'My skills'} component={textareaField} />
        </FormRow>
        <FormRow>
            <RowLabel>About me:</RowLabel>
            <Field name='aboutMe' placeholder={'About me'} component={textareaField} />
        </FormRow>

        {Object.keys(autorizedProfile.contacts).map(key => {
            return (
                <FormRow key={key}>
                    <RowLabel>{key}:</RowLabel>
                    <Field name={`contacts.${key}`} type='text' placeholder={key} component={inputField} />
                </FormRow>
            )
        })}

        { error && <CommonErrorMsg>{error}</CommonErrorMsg> }

        <Button type='submit'>save</Button>
    </form>

)

export default reduxForm<ProfileType, Props>({
    form: 'edit-profile'
})(ProfileEditForm)


const FormRow = styled.div`
    display: flex;
    font-size: 13px;
    padding: 5px 0;
`
const RowLabel = styled.label`
    width: 170px;
    color: #828282;
`
const CommonErrorMsg = styled.div`
    display: inline-block;
    border: 1px solid red;
    padding: 5px;
    color: red;
`
