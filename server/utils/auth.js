const { GraphQLError } = require('graphql');
const jwt = require('jsonwebtoken');

const secret = 'mysecretssshhhhhhh';
const expiration = '144h';

// authorizes user by creating token
module.exports = {
  contextTokenizer: ({request: req, contextValue}) => {
    // // console.log(req.body);
    const header = req.http.headers.get('authorization') || req.http.headers.get('Authorization');
    let token = req.http.body.token || header;

    if(header) {
      token = token.split(' ').pop().trim();
    }
    if(!token){
      return false;
    }

    try{
      // checks token signature
      const {data} = jwt.verify(token, secret, { maxAge: expiration });
      if(data){
        contextValue.user = data;
      }
      return data;
    }catch(err){
      console.log(err);
      console.log("contextTokenizer: invalid token");
    }

    return false;
  },
  signToken: function ({ email, username, _id }) {
    const payload = { email, username, _id };
    return jwt.sign({ data: payload }, secret, { expiresIn: expiration });
  },
};
