
let users = require("../../assets/users.json");

function getUser(id) {
  return users.find(user => {
    return user.id === id && !user.isDeleted;
  });
}

function createUser(user) {
  user.id = UUID();
  user.isDeleted = false;
  users.push(user);
  return user;
}

function deleteUser(id) {
  let user = users.find(user => {
    return user.id === id && !user.isDeleted;
  });
  if (!user) {
    return null;
  }
  user.isDeleted = true;
  return user;
}

function updateUser(id, updatedUser) {
  let user = users.find(user => {
    return user.id === id && !user.isDeleted;
  });
  if (!user) {
    return null;
  }
  return Object.assign(user, updatedUser);
}

function searchUser(login,limit){
  let requestedUsers = users.filter(user => {
    return user.login.indexOf(login) !== -1;
  })
  return requestedUsers.length <= limit ? requestedUsers : requestedUsers.slice(0,limit);

}

function UUID() {
  function s(n) {
    return h((Math.random() * (1 << (n << 2))) ^ Date.now()).slice(-n);
  }
  function h(n) {
    return (n | 0).toString(16);
  }
  return [
    s(4) + s(4),
    s(4),
    "4" + s(3), // UUID version 4
    h(8 | (Math.random() * 4)) + s(3), // {8|9|A|B}xxx
    // s(4) + s(4) + s(4),
    Date.now()
      .toString(16)
      .slice(-10) + s(2) // Use timestamp to avoid collisions
  ].join("-");
}

module.exports = { updateUser, deleteUser, getUser, createUser,searchUser };
