function GroupService(model) {
  this.model = model;
}

GroupService.prototype.createGroup = async function(group) {
  let data = await this.model.create(group);
  return data.dataValues;
};

GroupService.prototype.getGroup = async function(id) {
  let data = await this.model.findOne({
    where: { id }
  });
  return data;
};

GroupService.prototype.deleteGroup = async function(id) {
  let group = await this.model.destroy({ where: { id } });
  return group;
};

GroupService.prototype.updateGroup = async function(id, payload) {
  try {
    let group = await this.model.update(payload, {
      where: { id },
      returning: true,
      plain: true
    });
    return group ? group[1] : null;
  } catch (exe) {
    return null;
  }
};

GroupService.prototype.getAllGroups = async function() {
  let groups = await this.model.findAll();
  return groups;
};

module.exports = GroupService;
