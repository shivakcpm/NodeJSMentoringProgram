let express = require("express");
let router = express.Router();
const Joi = require("joi");
const validator = require("express-joi-validation").createValidator({});

let groupModel = require("../database/models").Groups;
let GroupService = require("../services/groupService");
let groupService = new GroupService(groupModel);

const bodySchema = Joi.object().keys({
  name: Joi.string().required(),
  permissions: Joi.array()
    .items(
      Joi.string().valid(["READ", "WRITE", "SHARE", "DELETE", "UPLOAD_FILES"])
    )
    .min(1)
    .required()
});

router.get("/all", (req, res) => {
  groupService.getAllGroups().then(groups => {
    res.send(groups);
  });
});

router.get("/:id", (req, res) => {
  const id = req.params.id;
  groupService.getGroup(id).then(group => {
    if (!group) {
      return res.status(404).end();
    } else {
      res.send(group);
    }
  });
});



router.post("/", validator.body(bodySchema), (req, res) => {
  const body = req.body;
  groupService
    .createGroup(body)
    .then(group => res.send(group))
    .catch(err => res.status(400).send(err));
});

router.put("/:id", validator.body(bodySchema), (req, res) => {
  const body = req.body;
  const id = req.params.id;
  groupService.updateGroup(id, body).then(group => {
    if (!group) {
      return res.status(404).end();
    }
    res.send(group);
  });
});

router.delete("/:id", (req, res) => {
  const id = req.params.id;

  groupService.deleteGroup(id).then(group => {
    if (!group) {
      return res.status(404).end();
    }
    res.send({ success: true });
  });
});

router.all("*", (req, res) => {
  return res.status(404).end();
});

module.exports = router;
