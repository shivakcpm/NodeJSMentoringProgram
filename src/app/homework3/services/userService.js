function UserService(model) {
  this.model = model;
}

UserService.prototype.createUser = function(payload) {
  return this.model.create(payload);
};

UserService.prototype.getUser = function(id) {
  return this.model.findOne(id);
};

UserService.prototype.deleteUser = function(id) {
  return this.model.remove(id);
};

UserService.prototype.updateUser = function(id, payload) {
  return this.model.update(id, payload);
};

UserService.prototype.searchUser = function(limit, query) {
  return this.model.findAll(limit, query);
};

module.exports = UserService;
