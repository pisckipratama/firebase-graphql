const GraphQLNonNull = require('graphql').GraphQLNonNull;
const GraphQLString = require('graphql').GraphQLString;
const UserType = require('../types/user');
const services = require('../../services');

exports.remove = {
  type: UserType.userType,
  args: {
    userName: {
      type: new GraphQLNonNull(GraphQLString)
    }
  },
  resolve(root, params) {
    return services.deleteUser(params);
  }
}