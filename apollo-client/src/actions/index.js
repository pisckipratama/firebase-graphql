import ApolloClient from 'apollo-boost';
import gql from 'graphql-tag';

const API_URL = 'http://localhost:3000/graphql/'

const client = new ApolloClient({
  uri: API_URL
});

// start load user data
export const loadUserSuccess = (users) => ({
  type: 'LOAD_USER_SUCCESS',
  users
})

export const loadUserFailure = () => ({
  type: 'LOAD_USER_FAILURE'
})

export const loadUser = () => {
  const usersQuery = gql `
  query {
    users{
      userName
      Name
      Age
    }
  }`;
  return dispatch => {
    return client.query({
        query: usersQuery,
      })
      .then(function (response) {
        console.log(response);
        dispatch(loadUserSuccess(response.data.users))
      })
      .catch(function (error) {
        console.error(error);
        dispatch(loadUserFailure())
      });
  }
}

// end load user data

// start post user data

export const postUserSuccess = (users) => ({
  type: 'POST_USER_SUCCESS',
  users
})

export const postUserFailure = (userName) => ({
  type: 'POST_USER_FAILURE',
  userName
})

const postUserRedux = (userName, Name, Age) => ({
  type: 'POST_USER',
  userName,
  Name,
  Age
})


export const postUser = (userName, Name, Age) => {
  const addQuery = gql `
  mutation updateUser($userName: String!, $Name: String!, $Age: String!) {
    addUser(userName: $userName, Name: $Name, Age: $Age) {
      userName
      Name
      Age
    }
  }`;
  return dispatch => {
    dispatch(postUserRedux(userName, Name, Age))
    return client.mutate({
        mutation: addQuery,
        variables: {
          userName,
          Name,
          Age
        }
      })
      .then(function (response) {
        dispatch(postUserSuccess(response.data))
      })
      .catch(function (error) {
        console.error(error);
        dispatch(postUserFailure(userName))
      });
  }
}

// start delete user data
const deleteUserRedux = (userName) => ({
  type: 'DELETE_USER',
  userName
})

export const deleteUserSuccess = (users) => ({
  type: 'DELETE_USER_SUCCESS',
  users
})

export const deleteUserFailure = () => ({
  type: 'DELETE_USER_FAILURE'
})


export const deleteUser = (userName) => {
  const deleteQuery = gql `
  mutation removeUser($userName: String!) {
    removeUser(userName: $userName) {
      userName
    }
  }`;
  return dispatch => {
    dispatch(deleteUserRedux(userName))
    return client.mutate({
        mutation: deleteQuery,
        variables: {
          userName
        }
      })
      .then(function (response) {
        dispatch(deleteUserSuccess(response))
      })
      .catch(function (error) {
        console.error(error);
        dispatch(deleteUserFailure())
      });
  }
}

// end delete user data

export const resendUser = (userName, Name, Age) => {
  const addQuery = gql `
  mutation updateUser($userName: String!, $Name: String!, $Age: String!) {
    addUser(userName: $userName, Name: $Name, Age: $Age) {
      userName
      Name
      Age
    }
  }`;
  return dispatch => {
    return client.mutate({
        mutation: addQuery,
        variables: {
          userName,
          Name,
          Age
        }
      })
      .then(function (response) {
        dispatch(postUserSuccess(response))
      })
      .catch(function (error) {
        console.error(error);
        dispatch(postUserFailure(userName))
      });
  }
}