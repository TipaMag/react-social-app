import React from 'react'
import styled from 'styled-components'
import { WrappedFieldInputProps, WrappedFieldMetaProps } from 'redux-form'


interface IFieldProps {
    input: WrappedFieldInputProps
    label?: string | undefined
    type?: string
    placeholder?: string
    meta: WrappedFieldMetaProps
}
export const inputField: React.FC<IFieldProps> = ({ input, label, type, placeholder, meta: { touched, error, warning } }) => (
    <FormControl>
        <Label>{label}
            <Input {...input} type={type} placeholder={placeholder} />
        </Label>
        {touched &&
            ((error && <ErrorMessage>{error}</ErrorMessage>) ||
                (warning && <WarningMessage>{warning}</WarningMessage>))
        }
    </FormControl>
)

export const inputCheckboxField: React.FC<IFieldProps> = ({ input, label, type, meta: { touched, error, warning } }) => {
    return (
        <FormControl>
            <Label>{label}
                <InputCheckbox {...input} type={type}/>
            </Label>
            {touched &&
                ((error && <ErrorMessage>{error}</ErrorMessage>) ||
                    (warning && <WarningMessage>{warning}</WarningMessage>))
            }
        </FormControl>
    )
}

export const textareaField: React.FC<IFieldProps> = ({ input, placeholder, meta: { touched, error, warning } }) => (
    <FormControl>
        <Textarea {...input} placeholder={placeholder} />
        {touched &&
            ((error && <ErrorMessage>{error}</ErrorMessage>) ||
                (warning && <WarningMessage>{warning}</WarningMessage>))
        }
    </FormControl>
)


const FormControl = styled.div`
    display: flex;
    flex-flow: column;
`
const Label = styled.label`
    display: flex;
`
const Input = styled.input`
    width: 100%;
    text-align: center;
    border: 1px solid var(--DARK-GRAY);
    padding: 5px 10px;
    font-size: 16px;
    border-radius: 5px;
`
const InputCheckbox = styled.input`

`
const Textarea = styled.textarea`
    resize: none;
    padding: 7px;
    border-radius: 5px;
`
const Message = styled.span`
    padding: 5px;
    border-radius: 5px;
    text-align: center;
    margin-top: 5px;
`
const ErrorMessage = styled(Message)`
    background-color: var(--LIGHT-RED);
`
const WarningMessage = styled(Message)`
    background-color: var(--YELLOW);
`