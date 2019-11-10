import React from 'react'
import Header from './Header'
import { setAuthUserData, setAuthUserSmallPhoto } from '../../redux/auth-reducer'
import { connect } from 'react-redux'
import { authAPI, profileAPI } from '../../api/api'

class HeaderContainer extends React.Component {
   componentDidMount() {
      authAPI.getAuth() //-------------------------------------------------> authAPI.getAuth()
         .then((response) => {
            if (response.resultCode === 0) {
               let { id, login, email } = response.data
               this.props.setAuthUserData(id, login, email)

               profileAPI.getProfile(id) //--------------------------------> profileAPI.getProfile()
                  .then((response) => {
                     if (!response.photos.small) {
                        this.props.setAuthUserSmallPhoto(response.photos.small)
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