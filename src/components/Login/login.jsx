import React from "react"
import { connect } from "react-redux"
import { login } from '../../redux/auth-reducer'
import LoginReduxForm from './LoginForm/LoginForm'


const Login = (props) => {

    const onLogin = (values) => {
        let {login, password, rememberMe} = values
        props.login(login, password, rememberMe) 
    }
    return (
        <div>
            <h1>Login</h1>
            <LoginReduxForm onSubmit={onLogin} />
        </div>
    )
}

const mapStateToProps = (state) => ({

})
export default connect(mapStateToProps, {
    login, // thunk
})(Login)

// export default Login