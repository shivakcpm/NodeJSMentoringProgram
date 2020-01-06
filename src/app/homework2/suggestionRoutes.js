let express = require("express");
let router = express.Router();
const Joi = require("joi");
const validator = require("express-joi-validation").createValidator({});
let collection = require('./collection');

const queryParamSchema = Joi.object({
  query: Joi.string().required()
});

router.get("/", validator.query(queryParamSchema), (req, res) => {
  const query = req.query.query;
  const limit = req.query.limit || 10;
  if (!query) {
    return res.status(404).end();
  }
  return res.send(collection.searchUser(query, limit));
});

router.all("*",(req,res) => {
  return res.status(404).end();
})

module.exports = router;