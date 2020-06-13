import React from "react"
import { useDispatch, useSelector } from "react-redux"
import ProfileEditForm from "./ProfileEditForm/ProfileEditForm"
import { saveProfileInfo } from '../../redux/profile-reducer'
import { withRouter, RouteComponentProps } from "react-router-dom"
import { compose } from "redux"
import Preloader from "../common/Preloader/Preloader"
import { AppStateType } from "../../redux/redux-store"
import { ProfileType } from "../../types/Profile-types"

type Props = RouteComponentProps

const ProfileEdit: React.FC<Props> = ({ history }) => {

    const dispatch = useDispatch()
    const autorizedProfile = useSelector((state: AppStateType) => state.profilePage.autorizedProfile)

    const handleSubmit = async (value: ProfileType) => {
        await dispatch(saveProfileInfo(value))
        history.push('/profile')
    }

    if (!autorizedProfile) return <Preloader />
    return (
        <ProfileEditForm initialValues={autorizedProfile} onSubmit={handleSubmit} autorizedProfile={autorizedProfile} />
    )
}

export default compose(withRouter)(ProfileEdit)