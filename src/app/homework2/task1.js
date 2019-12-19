const express = require("express");
const bodyParser = require("body-parser");
const Joi = require("joi");
const validator = require("express-joi-validation").createValidator({});
const collection = require("./collection");

const app = express();

const PORT = process.env.PORT || "3001";

app.use(bodyParser.json());

const queryParamSchema = Joi.object({
  query: Joi.string().required()
});

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

app.get("/user/:id", (req, res) => {
  let user = collection.getUser(req.params.id);
  if (!user) {
    return res.status(404).end();
  } else {
    res.send(user);
  }
});

app.get("/users", validator.query(queryParamSchema), (req, res) => {
  const query = req.query.query;
  const limit = req.query.limit || 10;
  if (!query) {
    return res.status(404).end();
  }
  return res.send(collection.searchUser(query, limit));
});

app.post("/user", validator.body(bodySchema), (req, res) => {
  const body = req.body;
  let user = collection.createUser(body);
  res.send(user);
});

app.put("/user/:id", validator.body(bodySchema), (req, res) => {
  let user = collection.updateUser(req.params.id, req.body);
  if (!user) {
    return res.status(404).end();
  }
  res.send(user);
});

app.delete("/user/:id", (req, res) => {
  let user = collection.deleteUser(req.params.id);
  if (!user) {
    return res.status(404).end();
  }
  res.send({ success: true });
});

app.listen(PORT,() => {
  console.log("Server listening on port number ", PORT);
});
