const jwt = require("jsonwebtoken");
const secret = require("../constants").JWT_SECRET_KEY;

let validate = function(req, res, next) {
  let token = req.headers['access-token'];
  if (!token) {
    return res.status(401).send("Unauthorized user");
  }
  jwt.verify(token, secret, (err, decoded) => {
    if (err) {
      return res.status(403).send("Forbidden");
    }
    return next();
  });
};

module.exports = validate;
