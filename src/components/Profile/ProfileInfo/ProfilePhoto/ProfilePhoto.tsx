import React from 'react'
import styled from 'styled-components'

import defaultUserImage from './../../../../assets/images/default-user-image.png'
import FileInput from './ProfilePhotoLoadInput'
import { useDispatch } from 'react-redux'
import { setProfilePhoto } from '../../../../redux/profile-reducer'

const PhotoContainer = styled.div`
    position: relative;
    &:hover form {
        display: flex;
    }
`
const PhotoImage = styled.img`
    display: block;
    width: 100%;
    height: 100%;
    border-radius: 2px;
`

interface Props {
    isOwner: boolean
    profilePhoto: string
}
const ProfilePhoto: React.FC<Props> = ({ isOwner, profilePhoto }) => {
    const dispatch = useDispatch()

    const onSetProfilePhoto = (formData: FormData) => {
        dispatch(setProfilePhoto(formData))
    }

    return (
        <PhotoContainer>
            <PhotoImage src={profilePhoto || defaultUserImage} alt='profile_photo'></PhotoImage>
            {isOwner &&
                <FileInput onSetProfilePhoto={onSetProfilePhoto} />
            }
        </PhotoContainer>
    )
}

export default ProfilePhoto