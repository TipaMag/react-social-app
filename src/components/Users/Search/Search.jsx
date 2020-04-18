import React, { useState } from 'react'
import Button from '../../../elements/Button'
import styled from 'styled-components'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch } from '@fortawesome/free-solid-svg-icons'

const SearchForm = styled.form`
    margin-left: auto;
    display: flex;
    & input {
        margin-right: 10px;
        outline: none;
    }
`
const Search = ({onSearchUser}) => {
    let [value, setValue] = useState('')

    const onSubmitHandler = (e) => {
        e.preventDefault()
        onSearchUser(value)
    }

    return (
        <SearchForm onSubmit={onSubmitHandler}>
            <input type='text'
                placeholder='search user...'
                onChange={e => setValue(e.target.value)}
                value={value}
            />
            <Button type='submit'>
                <FontAwesomeIcon icon={faSearch}/>
            </Button>
        </SearchForm>
    )
}

export default Search