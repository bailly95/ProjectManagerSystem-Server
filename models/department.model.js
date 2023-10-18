const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  return sequelize.define("department", {
    name: {
      type: DataTypes.STRING,
    },
  });
};
