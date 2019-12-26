import React from 'react'
import preloader from '../../../assets/images/Spinner-preloader.svg'
import styled from 'styled-components'

const Preloader = () => {
    return(
        <PreloaderOverlay>
            <img src={preloader} alt='preloader'/>
        </PreloaderOverlay>
    )
}
export default Preloader

// --------- styles -----------
const PreloaderOverlay = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
`