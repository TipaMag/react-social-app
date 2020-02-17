import React, { useState } from 'react'
import s from './ProfilePhotoLoadInput.module.css'

const FileInput = ({ setProfilePhoto }) => {
    let [state, setState] = useState({
        fileSelected: false,
        fileName: ''
    })
    let fileInput = React.createRef();
    let handleSubmit = (e) => {
        e.preventDefault();
        let formData = new FormData()
        formData.append('image', fileInput.current.files[0])
        setProfilePhoto(formData)
    }
    let handleChange = () => {
        if (fileInput.current.files.length > 0) {
            setState({
                fileSelected: true,
                fileName: fileInput.current.files[0].name
            })
        } else {
            setState({ fileSelected: false })
        }
    }
    return (
        <form className={s.fileInputForm} onSubmit={handleSubmit}>
            <label className={s.fileInputFormLable}>
                {!state.fileSelected ? 'Load photo' : state.fileName}
                <input className={s.inputFile} type="file" onChange={handleChange} ref={fileInput} />
            </label>
            {state.fileSelected &&
                <button className={s.loadPhotoBtn} type="submit">Submit</button>
            }
        </form>
    )
}
export default FileInput

// class FileInput extends React.Component {
//     constructor(props) {
//         super(props);
//         this.fileInput = React.createRef();
//         this.state = {
//             fileSelected: false,
//             fileName: ''
//         }
//     }
//     handleSubmit = (event) => {
//         event.preventDefault();
//         let formData = new FormData()
//         formData.append('image', this.fileInput.current.files[0])
//         this.props.setProfilePhoto(formData)
//     }
//     onChangeInput = () => {
//         if (this.fileInput.current.files.length === 1) {
//             this.setState({ 
//                 fileSelected: true, 
//                 fileName: this.fileInput.current.files[0].name 
//             })
//         } else {
//             this.setState({ fileSelected: false })
//         }
//     }

//     render() {
//         return (
//             <form className={s.fileInputForm} onSubmit={this.handleSubmit}>
//                 <label className={s.fileInputFormLable}>
//                     {!this.state.fileSelected ? 'Load photo' : this.state.fileName}
//                     <input className={s.inputFile} type="file" onChange={this.onChangeInput} ref={this.fileInput} />
//                 </label>
//                 {this.state.fileSelected &&
//                     <button className={s.loadPhotoBtn} type="submit">Submit</button>
//                 }
//             </form>
//         )
//     }
// }
// export default FileInput