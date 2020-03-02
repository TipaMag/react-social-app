import React from "react"
import { connect } from "react-redux"
import ProfileDataForm from "./ProfileEditForm/ProfileEditForm"
import { saveProfileInfo } from '../../redux/profile-reducer'
import { withRouter, RouteComponentProps } from "react-router-dom"
import { compose } from "redux"
import Preloader from "../common/Preloader/Preloader"
import { AppStateType } from "../../redux/redux-store"
import { ProfileType } from './../../types/Profile-types'

type Props = MapStateProps & MapDispatchProps & RouteComponentProps
const ProfileEdit: React.FC<Props> = ({ autorizedProfile, saveProfileInfo, history}) => {
    const onSubmit = (values: any) => {
        saveProfileInfo(values)
            .then(() => history.push('/profile'))
    }
    return (
        <div>
            {!autorizedProfile
                ? <Preloader />
                : <ProfileDataForm initialValues={autorizedProfile} onSubmit={onSubmit} autorizedProfile={autorizedProfile} />
            }
        </div>
    )
}

interface MapStateProps {
    autorizedProfile: ProfileType | null
}
interface MapDispatchProps {
    saveProfileInfo: (formData: any) => void | any
}
const mapStateToProps = (state: AppStateType) => ({
    autorizedProfile: state.profilePage.autorizedProfile,
})
export default compose(
  connect<MapStateProps, MapDispatchProps, null, AppStateType>(mapStateToProps, {
    saveProfileInfo
  }),
  withRouter
)(ProfileEdit)