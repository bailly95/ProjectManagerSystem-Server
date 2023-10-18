const db = require("../models");
const Department = db.department;


exports.getAllServices = async (req, res) => {
    try {
        const data = await Department.findAll();
        res.json(data);
    } catch (err) {
        res.status(500).json({
            message:
                err.message || "Some error occurred while retrieving services.",
        });
    }
}
