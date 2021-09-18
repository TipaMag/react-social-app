import usersReducer, { usersActions, initialStateType } from "./users-reducer"

let state: initialStateType

beforeEach(() => {
  state = {
    users: {
      items: [
        {
          name: "Sv1",
          id: 0,
          uniqueUrlName: null,
          photos: {
            small: "string",
            large: "string",
          },
          status: "string",
          followed: false,
        },
        {
          name: "Sv2",
          id: 1,
          uniqueUrlName: null,
          photos: {
            small: "string",
            large: "string",
          },
          status: "string",
          followed: false,
        },
        {
          name: "Sv3",
          id: 2,
          uniqueUrlName: null,
          photos: {
            small: "string",
            large: "string",
          },
          status: "string",
          followed: true,
        },
        {
          name: "Sv4",
          id: 3,
          uniqueUrlName: null,
          photos: {
            small: "string",
            large: "string",
          },
          status: "string",
          followed: true,
        },
      ],
      totalCount: 3,
      error: null,
    },
    friends: {
      items: [
        {
          name: "lllll1",
          id: 1,
          uniqueUrlName: null,
          photos: {
            small: "string",
            large: "string",
          },
          status: "string",
          followed: false,
        },
        {
          name: "lllll2",
          id: 2,
          uniqueUrlName: null,
          photos: {
            small: "string",
            large: "string",
          },
          status: "string",
          followed: false,
        },
        {
          name: "llll3",
          id: 3,
          uniqueUrlName: null,
          photos: {
            small: "string",
            large: "string",
          },
          status: "string",
          followed: false,
        },
      ],
      totalCount: 3,
      error: null,
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
})

describe('follow/unfollow users',() => {
    it("follow success", () => {
        const newState = usersReducer(state, usersActions.followSuccess(1))
        expect(newState.users.items[0].followed).toBeFalsy()
        expect(newState.users.items[1].followed).toBeTruthy()
    })
    it("unfollow success", () => {
        const newState = usersReducer(state, usersActions.unfollowSuccess(2))
        expect(newState.users.items[2].followed).toBeFalsy()
        expect(newState.users.items[3].followed).toBeTruthy()
    })
})