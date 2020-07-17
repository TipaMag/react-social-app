import usersReducer, {usersActions, initialStateType } from "./users-reducer";

test("follow success", () => {
  const state: initialStateType = {
    users: {
        items: [
            {
                name: 'Sv1',
                id: 0,
                uniqueUrlName: null,
                photos: {
                    small: 'string',
                    large: 'string'
                },
                status: 'string',
                followed: false
            },
            {
                name: 'Sv2',
                id: 1,
                uniqueUrlName: null,
                photos: {
                    small: 'string',
                    large: 'string'
                },
                status: 'string',
                followed: false
            },
            {
                name: 'Sv3',
                id: 2,
                uniqueUrlName: null,
                photos: {
                    small: 'string',
                    large: 'string'
                },
                status: 'string',
                followed: true
            }
        ],
        totalCount: 3,
        error: null
    },
    friends: {
        items: [
            {
                name: 'lllll1',
                id: 1,
                uniqueUrlName: null,
                photos: {
                    small: 'string',
                    large: 'string'
                },
                status: 'string',
                followed: false
            },
            {
                name: 'lllll2',
                id: 2,
                uniqueUrlName: null,
                photos: {
                    small: 'string',
                    large: 'string'
                },
                status: 'string',
                followed: false
            },
            {
                name: 'llll3',
                id: 3,
                uniqueUrlName: null,
                photos: {
                    small: 'string',
                    large: 'string'
                },
                status: 'string',
                followed: false
            }
        ],
        totalCount: 3,
        error: null
    },
    pageSize: 10,
    currentPage: {
      all: 1,
      friends: 1,
    }, // start pages
    isFetching: false, // preloader
    followingInProgress: [], // array of users id`s
    searchUser: "",
  }

  const newState = usersReducer(state, usersActions.followSuccess(1))

  expect(newState.users.items[0].followed).toBeFalsy()
})