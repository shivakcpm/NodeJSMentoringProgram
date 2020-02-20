let express = require("express");
let router = express.Router();
const Joi = require("joi");
const fs = require('fs');
const validator = require("express-joi-validation").createValidator({});

let userModel = require("../database/models").Users;
let UserService = require("../services/userService");

let userService = new UserService(userModel);

const bodySchema = Joi.object().keys({
  login: Joi.string().required(),
  password: Joi.string()
    .regex(/^(?=.*[0-9])(?=.*[a-zA-Z])([a-zA-Z0-9]+)$/)
    .required(),
  age: Joi.number()
    .integer()
    .min(4)
    .max(130)
    .required()
});

router.get("/:id", (req, res,next) => {
  const id = req.params.id;
  
  userService
    .getUser(id)
    .then(user => {
      if (!user) {
        return res.status(404).end();
      } else {
        res.send(user);
      }
    })
    .catch(error => {
     // fs.readFileSync('somefile.txt');
      next(error);
    });
});

router.post("/", validator.body(bodySchema), (req, res,next) => {
  const body = req.body;
  userService.createUser(body).then(user => res.send(user)).catch(error => {
    next(error);
     // throw e;
   });
});

router.put("/:id", validator.body(bodySchema), (req, res, next) => {
  const body = req.body;
  const id = req.params.id;
  userService
    .updateUser(id, body)
    .then(user => {
      if (!user) {
        return res.status(400).end();
      }
      res.send(user);
    })
    .catch(error => {
      next(error);
    });
});

router.delete("/:id", (req, res,next) => {
  const id = req.params.id;
  userService.deleteUser(id).then(user => {
    if (!user) {
      return res.status(404).end();
    }
    res.send({ success: true });
  }).catch(error => {
    next(error);
   });
});

router.all("*", (req, res) => {
  return res.status(404).end();
});

module.exports = router;
