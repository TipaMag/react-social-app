import React, { useState, useEffect } from 'react'
import s from './ProfileInfo.module.css'

const ProfileStatusWithHooks = (props) => {

    let [editMode, setEditMode] = useState(false)
    let [status, setStatus] = useState(props.profileStatus)
    useEffect(() => {
        setStatus(props.profileStatus)
    }, [props.profileStatus])

    const activateEditMode = () => {
        setEditMode(true)
    }
    const deactivateEditMode = () => {
        setEditMode(false)
        props.updateProfileStatus(status)
    }
    const onStatusChange = (event) => {
        setStatus(event.target.value)
    }

    return (
        <div className={s.statusContainer}>
            {!editMode &&
                <div>
                    <span onClick={activateEditMode} >{status || 'change status'}</span>
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