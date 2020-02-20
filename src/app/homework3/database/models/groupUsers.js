module.exports = (sequelize, DataTypes) => {
    const GroupUsers = sequelize.define('GroupUsers', {
      userId: {
        type: DataTypes.UUID,
       // allowNull: false,
        references: {
          model: 'Users',
          key: 'id'
        }
      },
      groupId: {
        type: DataTypes.UUID,
        // allowNull: false,
        references: {
          model: 'Groups',
          key: 'id'
        }
      }
    },{freezeTableName: true });
    return GroupUsers;
  };