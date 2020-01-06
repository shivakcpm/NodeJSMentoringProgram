let express = require("express");
let router = express.Router();
let collection = require('./collection');
const Joi = require("joi");
const validator = require("express-joi-validation").createValidator({});


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
  
  router.get("/:id", (req, res) => {
    let user = collection.getUser(req.params.id);
    if (!user) {
      return res.status(404).end();
    } else {
      res.send(user);
    }
  });
  
  router.post("/", validator.body(bodySchema), (req, res) => {
    const body = req.body;
    let user = collection.createUser(body);
    res.send(user);
  });
  
  router.put("/:id", validator.body(bodySchema), (req, res) => {
    let user = collection.updateUser(req.params.id, req.body);
    if (!user) {
      return res.status(404).end();
    }
    res.send(user);
  });
  
  router.delete("/:id", (req, res) => {
    let user = collection.deleteUser(req.params.id);
    if (!user) {
      return res.status(404).end();
    }
    res.send({ success: true });
  });

  router.all("*",(req,res) => {
    return res.status(404).end();
  })

  module.exports = router;