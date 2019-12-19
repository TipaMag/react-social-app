import React, { Component } from 'react'
import { getUserProfile, getUserProfileStatus, updateProfileStatus, setProfilePhoto, saveProfileInfo } from '../../redux/profile-reducer'
import { startChatting } from '../../redux/dialogs-reducer'
import Profile from './Profile'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
// import { withAuthRedirect } from '../Hoc/withAuthRedirect'
import { compose } from 'redux'

class ProfileContainer extends Component {

  refreshProfile() {
    let userId = this.props.match.params.userId // withrouter даёт доступ к URL
    if (!userId) {
      userId = this.props.autorizedUserId
      if (!userId) {
        this.props.history.push('/login')
        return // что б не отрабатывали лишние запросы на сервак
      }
      // (не самый красивый вариант переадресации... но вариант)
      //  (с ним косяк... если не залогинен, при клике на профиль, перед редиректом успевает отправить запрос на сервак (через раз))
      // но без него withAuthRedirect при попытке зайти на чужой профиль, редиректит на login-page
    }
    this.props.getUserProfile(userId)
    this.props.getUserProfileStatus(userId)
  }
  componentDidMount() {
    this.refreshProfile()
  }
  componentDidUpdate(prevProps, prevState) { // при клике на profile когда мы не получаем ID пользователя, обновляем компонент и попадаем на свой профиль
    if (this.props.match.params.userId !== prevProps.match.params.userId) { // без проверки получим зацикленность
      this.refreshProfile()
    }
  }

  onStartChatting = () => {
    this.props.startChatting(this.props.profile.userId)
  }

  render() {
    return (
      <Profile {...this.props}
        isOwner={!this.props.match.params.userId}
        profile={this.props.profile}
        profileStatus={this.props.profileStatus}
        updateProfileStatus={this.props.updateProfileStatus}
        setProfilePhoto={this.props.setProfilePhoto}
        saveProfileInfo={this.props.saveProfileInfo}
        onStartChatting={this.onStartChatting}
      />
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
    updateProfileStatus, //thunk
    setProfilePhoto, //thunk
    saveProfileInfo, //thunk
    startChatting
  }),
  withRouter, // оборачиваем компоненту widhRouter-ом, для доступа к URL строке
  // withAuthRedirect // HOC обёртка (редирект на login-page если не авторизован)
)(ProfileContainer)





// let AuthRedirectComponent = withAuthRedirect(ProfileContainer) // HOC обёртка (редирект на login-page если не авторизован)
// let widthUrlDataContainerComponent = withRouter(AuthRedirectComponent) // оборачиваем компоненту widhRouter-ом, для доступа к URL строке
// export default connect(mapStateToProps, {
//   getProfile //thunk
// })(widthUrlDataContainerComponent)