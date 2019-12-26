import React from 'react'
import s from './DateTime.module.css'

let DateTime = (props) => {
    let date = new Date( Date.parse(props.addedAt))
    let time = date.toLocaleTimeString()
    return(
        <span className={s.time}>{time}</span>
    )
}

export default DateTime