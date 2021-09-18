import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import { useDispatch } from 'react-redux'
import { updateProfileStatus } from '../../../../redux/profile-reducer'



interface Props {
    isOwner: boolean
    profileStatus: string
}
export const ProfileStatus: React.FC<Props> = ({isOwner, profileStatus}) => {
    const dispatch = useDispatch()
    
    let [editMode, setEditMode] = useState(false)
    let [status, setStatus] = useState(profileStatus)
    useEffect(() => {
        setStatus(profileStatus)
    }, [profileStatus])

    const activateEditMode = () => {
        if (isOwner) {
            setEditMode(true)
        }
    }
    const deactivateEditMode = () => {
        if (profileStatus !== status) {
            dispatch(updateProfileStatus(status))
        }
        setEditMode(false)
    }
    const onStatusChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setStatus(event.target.value)
    }

    return (
        <StatusContainer onClick={activateEditMode}>
            { !editMode && <StatusText>{status || 'empty status'}</StatusText> }
            { editMode && <StatusInput onChange={onStatusChange} onBlur={deactivateEditMode} autoFocus={true} value={status} /> }
        </StatusContainer>
    )
}


const StatusContainer = styled.div`
    border-radius: 5px;
    overflow: hidden;
    &:hover {
        background-color: var(--LIGHT-GRAY);
        cursor: pointer;
    }
`
const StatusText = styled.span`
    display: block;
    font-size: 13px;
    line-height: 16px;
    width: 100%;
    padding: 5px 10px;
`
const StatusInput = styled.input`
    padding: 5px 10px;
    outline: none;
    width: 100%;
    font-size: 15px;
    border: none;
    background-color: var(--SOFT-BLUE);
`