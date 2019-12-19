import React, { useState, useEffect } from 'react'
import s from './ProfileStatusWithHooks.module.css'

const ProfileStatusWithHooks = ({isOwner, profileStatus, updateProfileStatus}) => {

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
        setEditMode(false)
        updateProfileStatus(status)
    }
    const onStatusChange = (event) => {
        setStatus(event.target.value)
    }

    return (
        <div className={s.statusContainer}>
            {!editMode &&
                <div>
                    <span onClick={activateEditMode}>{status || 'empty status'}</span>
                </div>
            }
            {editMode &&
                <div>
                    <input onChange={onStatusChange} onBlur={deactivateEditMode} autoFocus={true} value={status} />
                </div>
            }
        </div>
    )
}
export default ProfileStatusWithHooks