let express = require("express");
let jwt = require("jsonwebtoken");
let router = express.Router();

const Joi = require("joi");
const validator = require("express-joi-validation").createValidator({});
const secret = require("../constants").JWT_SECRET_KEY;
let userModel = require("../database/models").Users;
let UserService = require("../services/userService");

let userService = new UserService(userModel);

const payloadSchema = Joi.object({
  id: Joi.string().required(),
  password:Joi.string().required(),
});

router.get("/", validator.body(payloadSchema), (req, res,next) => {
 console.log(req.body);
  userService.getUser(req.body.id).then(users => {
      if(!users  || users.password !== req.body.password){
          return res.status(401).send('Unauthorized user');
      }
      console.log(users);
      const token = jwt.sign({login:users.login,id:users.id},secret);
    res.send(token);
  }).catch(error => {
      console.log(error);
    next(error);
     // throw e;
   });
});

router.all("*", (req, res) => {
  return res.status(404).end();
});

module.exports = router;
