import React, { useState, useEffect } from 'react'
import s from './ProfileStatus.module.css'

const ProfileStatus = ({isOwner, profileStatus, updateProfileStatus}) => {
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
            updateProfileStatus(status)
        }
        setEditMode(false)
    }
    const onStatusChange = (event) => {
        setStatus(event.target.value)
    }

    return (
        <div className={s.statusContainer} onClick={activateEditMode}>
            {!editMode &&
                <span>{status || 'empty status'}</span>
            }
            {editMode &&
                <input onChange={onStatusChange} onBlur={deactivateEditMode} autoFocus={true} value={status} />
            }
        </div>
    )
}
export default ProfileStatus