import React, { useState } from 'react'
import styled from 'styled-components'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch } from '@fortawesome/free-solid-svg-icons'

const SearchForm = styled.form`
    display: flex;
    & input {
        margin-right: 10px;
        outline: none;
        padding: 10px 30px;
        width: 100%;
        border: none;
        border-bottom: 1px solid #e3e4e8;
        border-top: 1px solid #e3e4e8;
        &:focus {
            background-color: var(--LIGHT-BLUE);
        }
    }
    & button {
        background: transparent;
        border: transparent;
        cursor: pointer;
        outline: none;
    }
`

const Search = ({friend, onSearchUser}) => {
    let [value, setValue] = useState('')

    const onSubmitHandler = (e) => {
        e.preventDefault()
        onSearchUser(friend, value)
    }

    return (
        <SearchForm onSubmit={onSubmitHandler}>
            <input type='text'
                placeholder='search user...'
                onChange={e => setValue(e.target.value)}
                value={value}
            />
            <button type='submit'>
                <FontAwesomeIcon icon={faSearch}/>
            </button>
        </SearchForm>
    )
}

export default Search