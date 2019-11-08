import React from 'react'
import preloader from '../../../assets/images/Spinner-preloader.svg'

const Preloader = () => {
    return(
        <div className='preloaderContainer'>
            <img src={preloader} alt='preloader'/>
        </div>
    )
}
export default Preloader