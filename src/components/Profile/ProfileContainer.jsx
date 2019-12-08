import React from 'react'
import { getUserProfile, getUserProfileStatus, updateProfileStatus } from '../../redux/profile-reducer'
import Profile from './Profile'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { withAuthRedirect } from '../Hoc/withAuthRedirect'
import { compose } from 'redux'

class ProfileContainer extends React.Component {
  componentDidMount() {
    let userId = this.props.match.params.userId
    if (!userId) {
      userId = this.props.autorizedUserId
      // if(!userId) {
      //   this.props.history.push('/login')                                
      // }
       // (не самый красивый вариант переадресации... но вариант)
       //  (с ним косяк... если не залогинен, при клике на профиль, перед редиректом успевает отправить запрос на сервак (через раз))
    }
    this.props.getUserProfile(userId)
    this.props.getUserProfileStatus(userId)
  }
  render() {
    return (
      <Profile {...this.props} />
    )
  }
}

let mapStateToProps = (state) => ({
  profile: state.profilePage.profile,
  profileStatus: state.profilePage.profileStatus,

  autorizedUserId: state.auth.userId,
  isAuth: state.auth.isAuth
})
export default compose( // compose (такой себе рекурсивный декоратор)
  connect(mapStateToProps, {
    getUserProfile, //thunk
    getUserProfileStatus, //thunk
    updateProfileStatus //thunk
  }),
  withRouter, // оборачиваем компоненту widhRouter-ом, для доступа к URL строке
  withAuthRedirect // HOC обёртка (редирект на login-page если не авторизован)
)(ProfileContainer)





// let AuthRedirectComponent = withAuthRedirect(ProfileContainer) // HOC обёртка (редирект на login-page если не авторизован)
// let widthUrlDataContainerComponent = withRouter(AuthRedirectComponent) // оборачиваем компоненту widhRouter-ом, для доступа к URL строке
// export default connect(mapStateToProps, {
//   getProfile //thunk
// })(widthUrlDataContainerComponent)