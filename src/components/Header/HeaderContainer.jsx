import React from 'react'
import Header from './Header'
import { setAuthUserData, setAuthUserSmallPhoto } from '../../redux/auth-reducer'
import * as Axios from 'axios'
import { connect } from 'react-redux'

class HeaderContainer extends React.Component {
   componentDidMount() {
      Axios.get('https://social-network.samuraijs.com/api/1.0/auth/me', { withCredentials: true })
         .then((response) => {
            if (response.data.resultCode === 0) {
               let { id, login, email } = response.data.data
               this.props.setAuthUserData(id, login, email)

               Axios.get(`https://social-network.samuraijs.com/api/1.0/profile/${id}`)
                  .then((response) => {
                     if (!response.data.photos.small) {
                        this.props.setAuthUserSmallPhoto(response.data.photos.small)
                     }
                  })
            }
         })
   }
   render() {
      return (
         <Header {...this.props} />
      )
   }
}

let mapStateToProps = (state) => ({
   login: state.auth.login,
   isAuth: state.auth.isAuth,
   smallPhoto: state.auth.smallPhoto
})

export default connect(mapStateToProps, {
   setAuthUserData,
   setAuthUserSmallPhoto
})(HeaderContainer)