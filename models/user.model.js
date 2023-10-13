const { DataTypes } = require("sequelize");
module.exports = (sequelize) => {
  return sequelize.define("users", {
    firstname: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    lastname: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    resetLink: {
      type: DataTypes.STRING,
    },
  });
};
