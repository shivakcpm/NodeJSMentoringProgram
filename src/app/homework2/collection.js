let users = [
  {
      "login": "shivaram",
      "password": "cm5",
      "age": 24,
      "id": "9d9f61a8-bdda-42bb-8a18-6f128a4e84b2",
      "isDeleted": false
  },
  {
      "login": "shivakrishna",
      "password": "cpmshiva57",
      "age": 29,
      "id": "f118239e-7b5c-4a74-97c6-6f128a86e4eb",
      "isDeleted": false
  },
  {
      "login": "shivaram",
      "password": "cpmshiva57",
      "age": 34,
      "id": "957ca3ab-d8b0-4123-b509-6f128aa47b0a",
      "isDeleted": false
  }
];

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
