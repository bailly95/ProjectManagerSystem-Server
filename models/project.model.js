const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  return sequelize.define("projects", {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  });
};
