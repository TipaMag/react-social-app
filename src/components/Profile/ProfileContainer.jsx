import React from 'react'
import { setUserProfile } from '../../redux/profile-reducer'
import Profile from './Profile'
import axios from 'axios'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom';

class ProfileContainer extends React.Component {
  componentDidMount() {
    let userId  = this.props.match.params.userId
    if (!userId) {
      userId = 5070
    }
    axios.get(`https://social-network.samuraijs.com/api/1.0/profile/${userId}`)
      .then((response) => {
        this.props.setUserProfile(response.data)
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