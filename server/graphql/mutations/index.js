const addUser = require('./add').add;
const removeUser = require('./remove').remove;
const updateUser = require('./update').update;

module.exports = {
  addUser,
  removeUser,
  updateUser
}