const jwt = require('jsonwebtoken');
require('dotenv').config();

const accessSecret = process.env.ACCESS_TOKEN_SECRET;
const refreshSecret = process.env.REFRESH_TOKEN_SECRET;

module.exports = {
    // function for our authenticated routes
    authMiddleware: function (req, res, next) {
      let token = req.headers.authorization;
  
      // ["Bearer", "<tokenvalue>"]
      if (req.headers.authorization) {
        token = token.split(' ')[1];
        //token = token.split(' ').pop().trim()
      }
  
      if (!token) {
        return res.status(400).json({ message: 'You have no token!' });
      }
  
      // verify token and get user data out of it
      try {
        const data = jwt.verify(token, accessSecret);
        //console.log(data, `this is data`);
        req.user = data;
      } catch {
        console.log('Invalid token');
        return res.status(403).json({ message: 'invalid token!' });
      }

      // jwt.verify(
      //   token, 
      //   accessSecret,
      //   { maxAge: '15m'},
      //   (err, decoded) => {
      //     if (err) return res.status(403);
      //     req.user = decoded.email;
      //     next();
      //   });
  
      // send to next endpoint
      next();
    },
    signToken: function ({ email, _id }) {
      const payload = { email, _id };
  
      return jwt.sign({ data: payload }, accessSecret, { expiresIn: '2m' });
    },
    refreshToken: function ({ email, _id }) {
        const payload = { email, _id };
    
        return jwt.sign({ data: payload }, refreshSecret, { expiresIn: '1d' });
    },
};