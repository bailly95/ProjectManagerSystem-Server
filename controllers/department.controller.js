const db = require("../models");
const Department = db.department;
const { Op } = require("sequelize");


exports.getAllServices = async (req, res) => {
  try {
    const data = await Department.findAll({
      where: {
        id: {
          [Op.ne]: 1,
        },
      },
    });
    res.json(data);
  } catch (err) {
    res.status(500).json({
      message: err.message || "Some error occurred while retrieving services.",
    });
  }
};