let express = require("express");
let router = express.Router();
const Joi = require("joi");
const validator = require("express-joi-validation").createValidator({});

// let GroupUsersModel = require("../database/models").GroupUsers;
let GroupModel = require("../database/models").Groups;
let UserModel = require("../database/models").Users;
let UserGroupService = require("../services/userGroupService");

let userGroupService = new UserGroupService(UserModel,GroupModel);
const bodySchema = Joi.object().keys({
    group: Joi.string().required(),
    users: Joi.array().required(),
  });

router.post("/", validator.body(bodySchema), (req, res,next) => {
  userGroupService.addUsersToGroup(req.body).then(group => {
    res.send(group);
  }).catch(error => {
    next(error);
     // throw e;
   });
});

router.all("*", (req, res) => {
  return res.status(404).end();
});

module.exports = router;
