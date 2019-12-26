import React from 'react'
import s from './ProfilePhoto.module.css'
import defaultUserImage from './../../../../assets/images/default-user-image.png'

const ProfilePhoto = ({ profilePhoto, isOwner, setProfilePhoto }) => {
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
        this.state = {
            fileSelected: false,
            fileName: ''
        }
    }
    handleSubmit = (event) => {
        event.preventDefault();
        let formData = new FormData()
        formData.append('image', this.fileInput.current.files[0])
        this.props.setProfilePhoto(formData)
    }
    onChangeInput = () => {
        if (this.fileInput.current.files.length === 1) {
            this.setState({ fileSelected: true })
            this.setState({ fileName: this.fileInput.current.files[0].name })
        } else {
            this.setState({ fileSelected: false })
        }
    }

    render() {
        return (
            <form className={s.fileInputForm} onSubmit={this.handleSubmit}>
                <label className={s.fileInputFormLable}>
                    {!this.state.fileSelected ? 'Load foto' : this.state.fileName}
                    <input className={s.inputFile} type="file" onChange={this.onChangeInput} ref={this.fileInput} />
                </label>
                {this.state.fileSelected &&
                    <button className={s.loadPhotoBtn} type="submit">Submit</button>
                }
            </form>
        )
    }
}