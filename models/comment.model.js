const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  return sequelize.define("comments", {
    description: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
  });
};
