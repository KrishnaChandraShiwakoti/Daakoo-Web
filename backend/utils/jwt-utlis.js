const jwt = require("jsonwebtoken");

exports.generateToken = (payload) => {
  const options = {
    expiresIn: process.env.EXPIRES_IN,
  };
  return jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET, options);
};
