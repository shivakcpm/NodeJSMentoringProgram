'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Users', {
      login: {
        type: Sequelize.STRING
      },
      password: {
        type: Sequelize.STRING
      },
      id: {
        type: Sequelize.UUID,
        primaryKey: true,
      },
      age: {
        type: Sequelize.NUMBER
      },
      isdeleted: {
        type: Sequelize.BOOLEAN
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('Users');
  }
};