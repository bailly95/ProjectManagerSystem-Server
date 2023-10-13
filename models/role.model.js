const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  return sequelize.define("roles", {
    name: {
      type: DataTypes.STRING,
    },
  });
};
