import { setFollow, setUnfollow, usersActions } from "./users-reducer"
import { usersAPI } from '../api/users-api'
import { ResponseType, ResultCodesEnum } from "../api/api"

jest.mock('../api/users-api') // making a mock from the original call
const userAPIMock = usersAPI as jest.Mocked<typeof usersAPI> // axios mock types

const result: ResponseType = { // fake result
  data: {},
  messages: [],
  resultCode: ResultCodesEnum.Success
}

userAPIMock.setFollow.mockReturnValue(Promise.resolve(result)) //if we call, mock returns a fake result
userAPIMock.setUnfollow.mockReturnValue(Promise.resolve(result))

let dispatchMock = jest.fn()
let getStateMock = jest.fn()
beforeEach(() => {
  dispatchMock.mockClear()
  getStateMock.mockClear()
})

describe('follow-unfollow thuncs test', () => {
  test('follow thunc dispatch called', async () => {
    const thunc = setFollow(1)

    await thunc(dispatchMock, getStateMock, {})

    expect(dispatchMock).toBeCalledTimes(3)
    expect(dispatchMock).toHaveBeenNthCalledWith(1, usersActions.toggleFollowingProgress(true, 1))
    expect(dispatchMock).toHaveBeenNthCalledWith(2, usersActions.followSuccess(1))
    expect(dispatchMock).toHaveBeenNthCalledWith(3, usersActions.toggleFollowingProgress(false, 1))
  })

  test('unfollow thunc dispatch called', async () => {
    const thunc = setUnfollow(1)

    await thunc(dispatchMock, getStateMock, {})

    expect(dispatchMock).toBeCalledTimes(3)
    expect(dispatchMock).toHaveBeenNthCalledWith(1, usersActions.toggleFollowingProgress(true, 1))
    expect(dispatchMock).toHaveBeenNthCalledWith(2, usersActions.unfollowSuccess(1))
    expect(dispatchMock).toHaveBeenNthCalledWith(3, usersActions.toggleFollowingProgress(false, 1))
  })
})