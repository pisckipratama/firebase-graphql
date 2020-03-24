const users = (state = [], action) => {
  switch (action.type) {
    case 'LOAD_USER_SUCCESS':
      return action.users.map((item) => {
        item.sent = true;
        return item
      })

    case 'POST_USER':
      return [
        ...state,
        {
          userName: action.userName,
          Name: action.Name,
          Age: action.Age,
          sent: true
        }
      ]

    case 'POST_USER_SUCCESS':
      return state.map((item) => {
        item.sent = true;
        return item
      })

    case 'POST_USER_FAILURE':
      return state.map((item) => {
        if (item.userName === action.userName) {
          item.sent = false;
        }
        return item
      })

    case 'DELETE_USER':
      return state.filter((item) => item.userName !== action.userName)

    case 'DELETE_USER_SUCCESS':
      return state

    case 'LOAD_USER_FAILURE':
    case 'DELETE_USER_FAILURE':
    default:
      return state
  }
}

export default users