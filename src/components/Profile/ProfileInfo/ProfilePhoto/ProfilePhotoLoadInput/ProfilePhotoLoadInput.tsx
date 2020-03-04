import React, { useState } from 'react'
import s from './ProfilePhotoLoadInput.module.css'

interface OwnProps {
    setProfilePhoto: (formData: FormData) => void
}
interface LocalState {
    fileSelected: boolean
    fileName: any
    file: any
}
const FileInput: React.FC<OwnProps> = ({setProfilePhoto}) => {
    let [state, setState] = useState<LocalState>({ 
        fileSelected: false,
        fileName: '',
        file: null
    })
    let handleChange = (fileData: FileList | null) => {
        if (fileData?.length) {
            let fileName = fileData[0].name
            setState({ 
                fileSelected: true, 
                fileName: fileName.length > 15 ? fileName.slice(0, 15) : fileName,
                file: fileData[0]
            })
        } else {
            setState({ 
                fileSelected: false, 
                fileName: '' ,
                file: null
            })
        } 
    }
    let handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        let formData = new FormData()
        formData.append('image', state.file)
        setProfilePhoto(formData)
        setState({ fileSelected: false, fileName: '', file: null })
    }
    return (
        <form className={s.fileInputForm} onSubmit={handleSubmit}>
            <label className={s.fileInputFormLable}>
                {!state.fileSelected ? 'Load photo' : state.fileName}
                <input className={s.inputFile} type="file" onChange={e => handleChange(e.target.files)}/>
            </label>
            {state.fileSelected &&
                <button className={s.loadPhotoBtn} type="submit">Submit</button>
            }
        </form>
    )
}
export default FileInput




// import React, { useState } from 'react'
// import s from './ProfilePhotoLoadInput.module.css'

// const FileInput = (props) => {
//     let [state, setState] = useState({
//         fileSelected: false,
//         fileName: ''
//     })
//     let fileInput = React.createRef();
//     let handleSubmit = (e) => {
//         e.preventDefault();
//         let formData = new FormData()
//         formData.append('image', fileInput.current.files[0])
//         props.setProfilePhoto(formData)
//     }
//     let handleChange = () => {
//         if (fileInput.current.files.length > 0) {
//             setState({
//                 fileSelected: true,
//                 fileName: fileInput.current.files[0].name
//             })
//         } else {
//             setState({ fileSelected: false })
//         }
//     }
//     return (
//         <form className={s.fileInputForm} onSubmit={handleSubmit}>
//             <label className={s.fileInputFormLable}>
//                 {!state.fileSelected ? 'Load photo' : state.fileName}
//                 <input className={s.inputFile} type="file" onChange={handleChange} ref={fileInput} />
//             </label>
//             {state.fileSelected &&
//                 <button className={s.loadPhotoBtn} type="submit">Submit</button>
//             }
//         </form>
//     )
// }
// export default FileInput