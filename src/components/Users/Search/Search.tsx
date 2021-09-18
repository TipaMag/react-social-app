import React, { FC } from 'react'
import { Formik, Field, Form } from 'formik'
import styled from 'styled-components'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch } from '@fortawesome/free-solid-svg-icons'

type Props = {
    friend: boolean
    onSearchUser: (friend: boolean, searchUser: string) => void
}

export const Search: FC<Props> = ({friend, onSearchUser}) => {
    return (
      <Formik
        initialValues={{
          search: ""
        }}
        onSubmit={(values) => {
          console.log(values)
          let val = values.search
          onSearchUser(friend, val)
        }}
      >
        <StyledForm>
          <Field name="search" placeholder="search user..." type="text"/>
          <button type="submit">
            <FontAwesomeIcon icon={faSearch}/>
          </button>
        </StyledForm>
      </Formik>
    );
}


const StyledForm = styled(Form)`
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