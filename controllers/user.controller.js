const db = require("../models");
const User = db.user;

exports.getUserById = async (req, res) => {
  const id = req.params.id;
  try {
    const user = await User.findByPk(id,{
  attributes: ["id", "email","firstname","lastname"],
});
    
    res.status(200).json({
      user: user,
      message: "Data successfully retrieved.",
    });
  } catch (err) {
    res.status(500).json(err);
  }
};
