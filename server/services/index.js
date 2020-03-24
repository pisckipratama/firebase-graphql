const firebase = require('firebase');

const getUsers = () => {
  const userReferences = firebase.database().ref('/Users');
  return (new Promise((resolve, reject) => {
    userReferences.on('value', (snapshoot) => {
      const folders = snapshoot.val();
      if (folders === null) {
        resolve([]);
      } else {
        const data = Object.keys(folders).map(o => Object.assign({ userName: o }, folders[o]))
        resolve(data);
      }
      userReferences.off('value');
    }, (errorObject) => {
      console.log('the read failed: ' + errorObject.code);
      reject('the read failed: ' + errorObject.code);
    })
  }))
}

const createUser = (user) => {
  const referencePath = `/Users/${user.userName}/`;
  const userReference = firebase.database().ref(referencePath);
  return (new Promise((resolve, reject) => {
    userReference.set({Name: user.Name, Age: user.Age}, (error) => {
      if (error) {
        reject("Data could not be deleted." + error);
      } else {
        resolve(user);
      }
    });
  }));
}

//Update existing instance
const updateUser = (user) => {
  var referencePath = `/Users/${user.userName}/`;
  var userReference = firebase.database().ref(referencePath);
  return (new Promise((resolve, reject) => {
    userReference.update({Name: user.Name, Age: user.Age}, (error) => {
      if (error) {
        reject("Data could not be deleted." + error);
      } else {
        resolve(user);
      }
    });
  }));
}

//Delete an instance
const deleteUser = (user) => {
  var referencePath = `/Users/${user.userName}/`;
  var userReference = firebase.database().ref(referencePath);
  return (new Promise((resolve, reject) => {
    userReference.remove((error) => {
      if (error) {
        reject("Data could not be deleted." + error);
      } else {
        resolve(user);
      }
    })
  }));
}

module.exports = {
  getUsers,
  createUser,
  updateUser,
  deleteUser
}