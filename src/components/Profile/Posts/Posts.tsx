import React from 'react'
import { addPost } from '../../../redux/profile-reducer'
import { connect } from 'react-redux'
import s from './Posts.module.css'
import Post from './Post/Post'
import AddPostReduxForm from './MyPostForm/MyPostForm'
import { AppStateType } from '../../../redux/redux-store'
import { PostType } from '../../../types/Profile-types'

type Props = MapStateProps & MapDispatchProps
const Posts: React.FC<Props> = ({ postsData, addPost }) => {

  let addNewPost = (values: any) => {
    addPost(values.newPostBody)
  }
  return (
    <div className={s.postsWrapper}>
      <AddPostReduxForm onSubmit={addNewPost} />
      <ul className={s.postsList}>
        {postsData.map(item =>
          <Post key={item.id} message={item.message} likesCount={item.likesCount} />)
        }
      </ul>
    </div>
  )
}
interface MapStateProps {
  postsData: Array<PostType>
}
interface MapDispatchProps {
  addPost: (formData: any) => void
}
let mapStateToProps = (state: AppStateType) => ({
  postsData: state.profilePage.postsData
})
export default connect<MapStateProps, MapDispatchProps, {}, AppStateType>(mapStateToProps, {
  addPost
})(Posts)