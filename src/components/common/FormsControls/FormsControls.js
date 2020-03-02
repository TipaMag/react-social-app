import React from 'react'
import s from './FormsControls.module.css'

export const inputField = ({ input, label, type, placeholder, meta: { touched, error, warning } }) => (
    <div className={s.formControl}>
        <label>{label}
            <input {...input} type={type} placeholder={placeholder} />
        </label>
        {touched &&
            ((error && <span className={s.errorMessage}>{error}</span>) ||
                (warning && <span className={s.warningMessage}>{warning}</span>))
        }
    </div>
)

export const textareaField = ({ input, placeholder, meta: { touched, error, warning } }) => (
    <div className={s.formControl}>
        <textarea {...input} placeholder={placeholder} />
        {touched &&
            ((error && <span className={s.errorMessage}>{error}</span>) ||
                (warning && <span className={s.warningMessage}>{warning}</span>))
        }
    </div>
)