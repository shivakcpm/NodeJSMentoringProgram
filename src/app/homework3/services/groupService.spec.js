//let userModel = require("../database/models").Users;
let GroupService = require("../services/groupService");
// let expect = require('jest')
let data = { name: "shiva", permissions: ['READ','WRITE'], id: "idgyk" };
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
    return [null, data];
  },
  destroy: () => {
      return data;
  }
};
let groupService = new GroupService(mockModel);

describe("Group Service", () => {
  test("it should create a group", async () => {
    let result = await groupService.createGroup(data);
    expect(result).toEqual([data]);
  });
  test("it should find a group by id", async () => {
    let result = await groupService.getGroup(data.id);
    expect(result).toEqual(data);
  });
  test("it should  delete a group by id", async () => {
    let result = await groupService.deleteGroup(data.id);
    expect(result).toEqual(data);
  });
  test("it should update as group by id", async () => {
    let result = await groupService.updateGroup(data.id,data);
    expect(result).toEqual(data);
  });
  test("it should find all the groups", async () => {
    let result = await groupService.getAllGroups();
    expect(result).toEqual([data]);
  });
});
