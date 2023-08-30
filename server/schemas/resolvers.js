
const { User } = require('../models');
const { signToken, AuthenticationError } = require('../utils/auth');

const isLoggedIn = (context) => {
  if(context && context.hasOwnProperty('user') && context.user.hasOwnProperty('_id')){
    return true;
  }
  return false;
}

const resolvers = {
    Query: {
        // By adding context to our query, we can retrieve the logged in user without specifically searching for them
        me: async (parent, {}, context) => {
          if(!isLoggedIn(context)){
            throw new Error("Not logged in");
          }
          const id = context.user._id;
          // // used the below line to test my query
          let user = await User.findById(id);
          // if you need to modify output or want to only see plain data, use toObject function
          user = user.toObject();
    
          console.log(user);
          return user;
        },
    },
    Mutation: {
        addUser: async (parent, { username, email, password }) => {
          const user = await User.create({ username, email, password });
          const token = signToken(user);
    
          return { token, user};
        },
        login: async (parent, { email, password }) => {
          const user = await User.findOne({ email });
    
          if (!user) {
            throw new Error('Error: No user found with this email address');
          }
    
          const correctPw = await user.isCorrectPassword(password);
    
          if (!correctPw) {
            throw new Error('Error: Incorrect credentials');
          }
    
          const token = signToken(user);
          return { token, user };
        },
    },
};

module.exports = resolvers;