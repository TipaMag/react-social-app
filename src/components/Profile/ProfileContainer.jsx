import React from 'react'
import { setUserProfile } from '../../redux/profile-reducer'
import Profile from './Profile'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom';
import { profileAPI } from '../../api/api'

class ProfileContainer extends React.Component {
  componentDidMount() {
    let userId  = this.props.match.params.userId
    if (!userId) {
      userId = 5070
    }
    profileAPI.getProfile(userId) // profileAPI.getProfile
      .then((response) => {
        this.props.setUserProfile(response)
      })
  }
  render() {
    return (
      <Profile {...this.props} />
    )
  }
}

let mapStateToProps = (state) => ({
  profile: state.profilePage.profile
})


let widthUrlDataContainerComponent = withRouter(ProfileContainer) // оборачиваем компоненту widhRouter-ом, для доступа к URL строке
export default connect(mapStateToProps,
  {
    setUserProfile
  }
)(widthUrlDataContainerComponent)