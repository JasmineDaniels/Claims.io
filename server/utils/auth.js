const jwt = require('jsonwebtoken');
const path = require('path')
require('dotenv').config({path: path.resolve(__dirname, '../.env')});

const accessSecret = process.env.ACCESS_TOKEN_SECRET;
const refreshSecret = process.env.REFRESH_TOKEN_SECRET;

//add credentials middleware 
module.exports = {
    // function for our authenticated routes
    authMiddleware: function (req, res, next) {
      let token = req.headers.authorization || req.headers.Authorization;
  
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
  
      // send to next endpoint
      next();
    },
    // refreshMiddleware: function (req, res, next){
    //   const cookies = req.cookies;
    //   console.log(cookies);
    //   if(!cookies.jwt) {
    //     return res.status(401);
    //   }
    //   const refreshToken = cookies.jwt;
    // },
    signToken: function ({ email, _id, role }) {
      const payload = { email, _id, role };
  
      return jwt.sign({ data: payload }, accessSecret, { expiresIn: '2m' });
    },
    refreshToken: function ({ email, _id }) {
        const payload = { email, _id };
    
        return jwt.sign({ data: payload }, refreshSecret, { expiresIn: '5m' });
    },
};