const { DataTypes } = require("sequelize");
module.exports = (sequelize) => {
  return sequelize.define("notifications", {
    description: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    link: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  });
};