let Sequelize = require('sequelize');


function UserService(model) {
  this.model = model;
}

UserService.prototype.createUser = async function(user) {
  let data = await this.model.create(user);
  return data.dataValues;
};

UserService.prototype.getUser = async function(id) {
  let data = await this.model.findOne({
    where: { id }
  });
  return data;
};

UserService.prototype.deleteUser = async function(id) {
  let user = await this.model.update(
    { isDeleted: true },
    {
      where: { id },
      returning: true,
      plain: true
    }
  );
  return user[1];
};

UserService.prototype.updateUser =  async function(id, payload) {
  try {
    let user = await this.model.update(payload, {
      where: { id, isDeleted: false },
      returning: true,
      plain: true
    });
    return user ? user[1] : null;
  } catch (exe) {
    return null;
  }
};

UserService.prototype.searchUser = async function(limit, query) {
  let iLike = Sequelize.Op.iLike;
  let users = await this.model.findAll({
    limit: limit,
    where: { login: { [iLike]: query + "%" }, isDeleted: false }
  });
  return users;
};

module.exports = UserService;
