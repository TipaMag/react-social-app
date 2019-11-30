import { addPost} from '../../../redux/profile-reducer'
import MyPosts from './MyPosts'
import { connect } from 'react-redux'

let mapStateToProps = (state) => {
  return {
    profilePage: state.profilePage
  }
}
export default connect(mapStateToProps, {
  addPost, //actionCreator
})(MyPosts)



// let mapDispatchToProps = (dispatch) => {
//   return {
//     updateNewPostText: (text) => {
//       dispatch(updateNewPostTextActionCreator(text))
//     },
//     newPost: () => {
//       dispatch(addPostActionCreator())
//     }
//   }
// }