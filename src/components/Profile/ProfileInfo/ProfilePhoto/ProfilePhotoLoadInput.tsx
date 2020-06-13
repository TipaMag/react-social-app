import React, { useState, ChangeEvent } from 'react'
import styled from 'styled-components'

const Form = styled.form`
    display: none;
    flex-direction: column;
    position: absolute;
    bottom: 0px;
    left: 0px;
    width: 100%;
    color: #fff;
    background-color: rgba(29,32,34,.7);
`
const FileInputLabel = styled.label`
    text-align: center;
    padding: 5px 10px;
    cursor: pointer;
`
const InputFile = styled.input`
    width: 0.1px;
	height: 0.1px;
	opacity: 0;
	overflow: hidden;
	position: absolute;
	z-index: -1;
`
const LoadFileBtn = styled.button`
    background-color: #f4511e;
    border: none;
    color: white;
    padding: 6px;
    font-size: 16px;
    cursor: pointer;
    outline: none;
    &:hover {
        opacity: 1;
    }
`

interface Props {
    onSetProfilePhoto: (formData: FormData) => void
}
interface LocalState {
    fileSelected: boolean
    fileName: any
    file: any
}
const FileInput: React.FC<Props> = ({ onSetProfilePhoto }) => {

    const [state, setState] = useState<LocalState>({
        fileSelected: false,
        fileName: '',
        file: null
    })

    const onPhotoSelected = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.files?.length) {
            let fileName = e.target.files[0].name
            setState({
                fileSelected: true,
                fileName: fileName.length > 15 ? fileName.slice(0, 15) : fileName,
                file: e.target.files[0]
            })
        } else {
            setState({
                fileSelected: false,
                fileName: '',
                file: null
            })
        }
    }

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        let formData = new FormData()
        formData.append('image', state.file)
        onSetProfilePhoto(formData)
        setState({ fileSelected: false, fileName: '', file: null })
    }

    return (
        <Form onSubmit={handleSubmit}>
            <FileInputLabel>
                {!state.fileSelected ? 'Load photo' : state.fileName}
                <InputFile type="file" onChange={onPhotoSelected} />
            </FileInputLabel>
            {state.fileSelected &&
                <LoadFileBtn type="submit">Submit</LoadFileBtn>
            }
        </Form>
    )
}
export default FileInput