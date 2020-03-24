//let userModel = require("../database/models").Users;
let UserService = require("../services/userService");
// let expect = require('jest')
let data = { login: "shiva", password: "rk@57", id: "idgyk" };
let mockModel = {
  create: () => {
    return { dataValues: [data] };
  },
  findOne: () => {
    return data;
  },
  findAll: () => {
    return [data];
  },
  update: () => {
    return [null, { ...data, isdeleted: true }];
  }
};
let userService = new UserService(mockModel);

describe("User Service", () => {
  test("it should create a user", async () => {
    let result = await userService.createUser(data);
    expect(result).toEqual([data]);
  });
  test("it should find a user by id", async () => {
    let result = await userService.getUser(data.id);
    expect(result).toEqual(data);
  });
  test("it should mark as deleted by id", async () => {
    let result = await userService.deleteUser(data.id);
    expect(result.isdeleted).toBeTruthy();
  });
  test("it should find all the matched terms", async () => {
    let result = await userService.searchUser(5,'shiva');
    expect(result).toEqual([data]);
  });
});
