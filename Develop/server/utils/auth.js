const jwt = require('jsonwebtoken');

const secret = 'mysecretsshhhhh';
const expiration = '2h';

module.exports = {
  authMiddleware: function ({ req }) {
    let token = req.body.token || req.headers.authorization;

    if (req.headers.authorization) {
      token = token.split(' ').pop().trim();
    }

    if (!token) {
      throw new Error('You have no token!');
    }

    let userData;
    try {
      const { data } = jwt.verify(token, secret, { maxAge: expiration });
      userData = data;
    } catch {
      throw new Error('Invalid token!');
    }

    return { ...req, user: userData };
  },
  
  signToken: function ({ username, email, _id }) {
    const payload = { username, email, _id };
    return jwt.sign({ data: payload }, secret, { expiresIn: expiration });
  },
};
