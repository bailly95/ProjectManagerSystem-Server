const db = require("../models");
const Service = db.service;

exports.addServices = async (req, res) => {
    try {
        const { name } = req.body;
        const service = await Service.create({
            name: name,
        });
        res.status(201).json(service);
    } catch (err) {
        res.status(500).json({ message: "Error while Service created: ", err });
    }
};