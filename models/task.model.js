const { DataTypes } = require("sequelize");
module.exports = (sequelize) => {
  return sequelize.define("tasks", {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    status: {
      type: DataTypes.INTEGER,
      defaultValue: 0
    },
    duration: {
      type: DataTypes.INTEGER,
    },
    priority: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    },
  });
};
