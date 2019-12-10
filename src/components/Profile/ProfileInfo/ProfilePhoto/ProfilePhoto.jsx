import React from 'react'
import s from './ProfilePhoto.module.css'
import defaultUserImage from './../../../../assets/images/default-user-image.png'

const ProfilePhoto = ({profilePhoto, isOwner, setProfilePhoto}) => {
    return (
        <div className={s.userPhoto}>
            <img src={profilePhoto || defaultUserImage} alt='profile_photo'></img>
            {
                isOwner &&
                <FileInput setProfilePhoto={setProfilePhoto} />
            }
        </div>
    )
}

export default ProfilePhoto



class FileInput extends React.Component {
    constructor(props) {
        super(props);
        this.fileInput = React.createRef();
    }
    handleSubmit = (event) => {
        event.preventDefault();
        let formData = new FormData()
        formData.append('image', this.fileInput.current.files[0])
        this.props.setProfilePhoto(formData)
    }

    render() {
        return (
            <form onSubmit={this.handleSubmit}>
                <label>
                    <input type="file" ref={this.fileInput} />
                </label>
                <button type="submit">Submit</button>
            </form>
        );
    }
}